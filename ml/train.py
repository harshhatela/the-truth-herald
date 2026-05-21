"""
Fake News Detector — ML Training Script
========================================
Trains a Logistic Regression model on TF-IDF features to classify news
articles as FAKE or REAL.

Data sources (in priority order):
  1. Google Cloud Storage  : gs://YOUR_PROJECT_ID-ml-data/Fake.csv & True.csv
  2. Local fallback         : ../Fake.csv & ../True.csv  (LOCAL_TRAINING=true)

Environment variables:
  LOCAL_TRAINING  – set to "true" to read CSVs from local disk and save
                    artefacts locally instead of uploading to GCS.

Outputs:
  model.pkl       – trained LogisticRegression classifier
  vectorizer.pkl  – fitted TF-IDF vectorizer
"""

import logging
import os
import re
import sys

import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
GCS_BUCKET = "gs://YOUR_PROJECT_ID-ml-data"
LOCAL_MODE = os.getenv("LOCAL_TRAINING", "false").lower() == "true"

# ---------------------------------------------------------------------------
# Data Loading
# ---------------------------------------------------------------------------

def load_data() -> pd.DataFrame:
    """Load Fake.csv and True.csv, label them, and return a combined DataFrame.

    In LOCAL_MODE the files are read from the parent directory; otherwise they
    are streamed directly from Google Cloud Storage via *gcsfs*.
    """

    if LOCAL_MODE:
        fake_path = os.path.join(os.path.dirname(__file__), "..", "Fake.csv")
        true_path = os.path.join(os.path.dirname(__file__), "..", "True.csv")
        logger.info("LOCAL_MODE enabled — loading data from local paths")
        logger.info("  Fake: %s", os.path.abspath(fake_path))
        logger.info("  True: %s", os.path.abspath(true_path))
    else:
        fake_path = f"{GCS_BUCKET}/Fake.csv"
        true_path = f"{GCS_BUCKET}/True.csv"
        logger.info("Loading data from GCS")
        logger.info("  Fake: %s", fake_path)
        logger.info("  True: %s", true_path)

    df_fake = pd.read_csv(fake_path)
    df_true = pd.read_csv(true_path)

    df_fake["label"] = "FAKE"
    df_true["label"] = "REAL"

    df = pd.concat([df_fake, df_true], ignore_index=True)
    logger.info("Loaded %d articles (FAKE=%d, REAL=%d)",
                len(df), len(df_fake), len(df_true))
    return df


# --- LIAR dataset fallback (commented out) -----------------------------------
# To use the LIAR dataset from HuggingFace instead of CSV files, uncomment the
# block below and comment out the `load_data()` function above.
#
# from datasets import load_dataset
#
# def load_data() -> pd.DataFrame:
#     """Load the LIAR dataset from HuggingFace and return a combined DataFrame.
#
#     Label mapping – the LIAR dataset uses a 6-class scheme; here we collapse
#     it into a binary FAKE / REAL split:
#       REAL  : true, mostly-true, half-true
#       FAKE  : barely-true, false, pants-fire
#     """
#     dataset = load_dataset("liar")
#     df = pd.DataFrame(dataset["train"])
#
#     label_map = {
#         0: "FAKE",   # false
#         1: "FAKE",   # half-true  → treat as FAKE for conservative model
#         2: "FAKE",   # barely-true
#         3: "REAL",   # half-true  → alternatively map here
#         4: "REAL",   # mostly-true
#         5: "REAL",   # true
#     }
#     df["label"] = df["label"].map(label_map)
#     df = df.rename(columns={"statement": "text"})
#     df["title"] = ""  # LIAR has no title column
#     logger.info("Loaded %d articles from LIAR dataset", len(df))
#     return df
# ------------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Text Cleaning
# ---------------------------------------------------------------------------

def clean_text(text: str) -> str:
    """Normalise a single article body for TF-IDF featurisation.

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
# Training Pipeline
# ---------------------------------------------------------------------------

def train() -> None:
    """End-to-end training pipeline: load → clean → vectorise → train → save."""

    # 1. Load data -----------------------------------------------------------
    df = load_data()

    # 2. Feature engineering --------------------------------------------------
    logger.info("Combining title + text into 'content' column …")
    df["content"] = (
        df["title"].fillna("").astype(str)
        + " "
        + df["text"].fillna("").astype(str)
    )

    logger.info("Cleaning text …")
    df["content"] = df["content"].apply(clean_text)

    # Drop rows that became empty after cleaning
    before = len(df)
    df = df[df["content"].str.strip().astype(bool)].reset_index(drop=True)
    dropped = before - len(df)
    if dropped:
        logger.warning("Dropped %d empty rows after cleaning", dropped)

    X = df["content"]
    y = df["label"]

    # 3. Train / test split ---------------------------------------------------
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y,
    )
    logger.info("Train size: %d | Test size: %d", len(X_train), len(X_test))

    # 4. TF-IDF vectorisation -------------------------------------------------
    logger.info("Fitting TF-IDF vectorizer …")
    vectorizer = TfidfVectorizer(
        stop_words="english",
        max_df=0.7,
        ngram_range=(1, 2),
    )
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    logger.info("Vocabulary size: %d", len(vectorizer.vocabulary_))

    # 5. Model training -------------------------------------------------------
    logger.info("Training Logistic Regression …")
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_tfidf, y_train)

    # 6. Evaluation -----------------------------------------------------------
    y_pred = model.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)

    logger.info("Accuracy: %.4f", accuracy)
    logger.info("Classification Report:\n%s", report)

    # 7. Save artefacts -------------------------------------------------------
    _save_artefacts(model, vectorizer)

    logger.info("Training complete ✓")


def _save_artefacts(model: LogisticRegression, vectorizer: TfidfVectorizer) -> None:
    """Persist the trained model and vectorizer.

    In LOCAL_MODE artefacts are written to the current directory.
    Otherwise they are uploaded to the configured GCS bucket.
    """

    if LOCAL_MODE:
        out_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(out_dir, "model.pkl")
        vec_path = os.path.join(out_dir, "vectorizer.pkl")

        joblib.dump(model, model_path)
        joblib.dump(vectorizer, vec_path)
        logger.info("Saved artefacts locally:")
        logger.info("  model      → %s", model_path)
        logger.info("  vectorizer → %s", vec_path)
    else:
        from google.cloud import storage as gcs

        bucket_name = GCS_BUCKET.replace("gs://", "")
        client = gcs.Client()
        bucket = client.bucket(bucket_name)

        # Model
        local_model = "/tmp/model.pkl"
        joblib.dump(model, local_model)
        bucket.blob("model.pkl").upload_from_filename(local_model)
        logger.info("Uploaded model.pkl → %s/model.pkl", GCS_BUCKET)

        # Vectorizer
        local_vec = "/tmp/vectorizer.pkl"
        joblib.dump(vectorizer, local_vec)
        bucket.blob("vectorizer.pkl").upload_from_filename(local_vec)
        logger.info("Uploaded vectorizer.pkl → %s/vectorizer.pkl", GCS_BUCKET)


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    train()
