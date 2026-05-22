"""
Fake News Detector — Firebase Cloud Function (Python)
=====================================================
Exposes an HTTP endpoint ``/predict`` that accepts a JSON payload with a
``text`` field and returns a FAKE / REAL verdict together with a confidence
score.

Architecture notes:
  • The trained model (``logistic_regression.pkl``) and TF-IDF vectorizer
    (``tfidf_vectorizer.pkl``) are loaded from the local ``functions/``
    directory on cold start and cached in module-level globals for
    subsequent warm invocations.
  • Text cleaning mirrors the training pipeline exactly so that inference
    features match training features.
"""

import json
import logging
import os
import re

import joblib
import numpy as np
from dotenv import load_dotenv
from firebase_functions import https_fn

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
load_dotenv()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# ---------------------------------------------------------------------------
# Global model cache (populated on cold start)
# ---------------------------------------------------------------------------
_model = None
_vectorizer = None

# Path to .pkl files — same directory as this script
_FUNCTIONS_DIR = os.path.dirname(os.path.abspath(__file__))


def _load_model():
    """Load model artefacts from the local functions/ directory and cache
    them globally.

    This function is idempotent — subsequent calls are no-ops once the
    model has been loaded.
    """
    global _model, _vectorizer

    if _model is not None and _vectorizer is not None:
        logger.info("Model already cached — skipping load")
        return

    logger.info("Cold start: loading model artefacts from %s …", _FUNCTIONS_DIR)

    model_path = os.path.join(_FUNCTIONS_DIR, "logistic_regression.pkl")
    vec_path = os.path.join(_FUNCTIONS_DIR, "tfidf_vectorizer.pkl")

    if not os.path.isfile(model_path):
        raise FileNotFoundError(
            f"Model file not found: {model_path}. "
            "Run ml/train.py first and copy the .pkl files into functions/."
        )
    if not os.path.isfile(vec_path):
        raise FileNotFoundError(
            f"Vectorizer file not found: {vec_path}. "
            "Run ml/train.py first and copy the .pkl files into functions/."
        )

    _model = joblib.load(model_path)
    logger.info("logistic_regression.pkl loaded successfully")

    _vectorizer = joblib.load(vec_path)
    logger.info("tfidf_vectorizer.pkl loaded successfully")


# ---------------------------------------------------------------------------
# Text Cleaning  (must mirror ml/train.py exactly)
# ---------------------------------------------------------------------------

def clean_text(text: str) -> str:
    """Normalise input text using the same pipeline as training.

    Steps:
      1. Remove Reuters byline tags, e.g. ``(Reuters)``
      2. Strip URLs
      3. Remove non-alphabetic characters
      4. Lowercase
      5. Collapse whitespace
    """
    text = re.sub(r"\(Reuters\)", "", text, flags=re.IGNORECASE)
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = text.lower().strip()
    text = re.sub(r"\s+", " ", text)
    return text


# ---------------------------------------------------------------------------
# CORS helpers
# ---------------------------------------------------------------------------

def _cors_headers() -> dict:
    """Return permissive CORS headers (all origins allowed)."""
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600",
    }


def _json_response(data: dict, status: int = 200) -> https_fn.Response:
    """Build a JSON response with CORS headers."""
    return https_fn.Response(
        response=json.dumps(data),
        status=status,
        headers={**_cors_headers(), "Content-Type": "application/json"},
    )


# ---------------------------------------------------------------------------
# Cloud Function entrypoint
# ---------------------------------------------------------------------------

@https_fn.on_request()
def predict(req: https_fn.Request) -> https_fn.Response:
    """HTTP Cloud Function — classify a news article as FAKE or REAL.

    **Request**  (POST, JSON):
        ``{ "text": "<article body>" }``

    **Response** (JSON):
        ``{
            "verdict": "FAKE" | "REAL",
            "confidence": float (0-1),
            "articlePreview": str (first 200 chars of input)
        }``
    """

    # --- Handle CORS preflight -----------------------------------------------
    if req.method == "OPTIONS":
        return https_fn.Response(
            response="",
            status=204,
            headers=_cors_headers(),
        )

    # --- Only accept POST ----------------------------------------------------
    if req.method != "POST":
        return _json_response(
            {"error": "Method not allowed. Use POST."},
            status=405,
        )

    # --- Parse request body ---------------------------------------------------
    try:
        body = req.get_json(silent=True)
        if body is None:
            return _json_response(
                {"error": "Invalid or missing JSON body."},
                status=400,
            )

        text = body.get("text")
        if not text or not isinstance(text, str) or not text.strip():
            return _json_response(
                {"error": "'text' field is required and must be a non-empty string."},
                status=400,
            )
    except Exception as exc:
        logger.exception("Failed to parse request body")
        return _json_response(
            {"error": f"Bad request: {str(exc)}"},
            status=400,
        )

    # --- Load model (cold start / cache) --------------------------------------
    try:
        _load_model()
    except Exception as exc:
        logger.exception("Failed to load model artefacts")
        return _json_response(
            {"error": "Model loading failed. Please try again later."},
            status=503,
        )

    # --- Inference ------------------------------------------------------------
    try:
        # 1. Clean the input text using the same pipeline as training
        cleaned = clean_text(text)

        if not cleaned.strip():
            return _json_response(
                {"error": "Text is empty after cleaning. Provide meaningful content."},
                status=422,
            )

        # 2. Vectorize with TF-IDF
        text_tfidf = _vectorizer.transform([cleaned])

        # 3. Get prediction + probability from LogReg model
        prediction = _model.predict(text_tfidf)[0]
        probabilities = _model.predict_proba(text_tfidf)[0]

        # Confidence = probability of the predicted class (0-1 float)
        pred_index = list(_model.classes_).index(prediction)
        confidence = round(float(probabilities[pred_index]), 4)

        # 4. Build article preview (first 200 chars of raw input)
        article_preview = text[:200] + ("…" if len(text) > 200 else "")

        return _json_response({
            "verdict": prediction,
            "confidence": confidence,
            "articlePreview": article_preview,
        })

    except Exception as exc:
        logger.exception("Inference failed")
        return _json_response(
            {"error": f"Prediction failed: {str(exc)}"},
            status=500,
        )
