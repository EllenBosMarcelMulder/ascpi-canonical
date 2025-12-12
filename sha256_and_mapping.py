#!/usr/bin/env python3
"""
ASCπ Repository Integrity Manifest Generator

Generates a deterministic hash manifest of the entire repository:
- Recursively walks all directories
- Computes SHA-256 hash per file
- Preserves directory structure
- Outputs a single canonical manifest file

Intended for:
- Integrity verification
- Prior art documentation
- Reproducibility audits

License: Humanity Heritage License π
"""

import hashlib
import os
import sys
from datetime import datetime

# ──────────────────────────────────────────────────────────────────────────────
# CONFIGURATION
# ──────────────────────────────────────────────────────────────────────────────

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
OUTPUT_FILE = "ASCPI_REPO_HASH_MANIFEST.txt"

EXCLUDE_DIRS = {
    ".git",
    "__pycache__",
    "node_modules",
}

EXCLUDE_FILES = {
    OUTPUT_FILE,
}

HASH_ALGO = "sha256"
BUFFER_SIZE = 1024 * 1024  # 1 MB


# ──────────────────────────────────────────────────────────────────────────────
# HASHING UTILITIES
# ──────────────────────────────────────────────────────────────────────────────

def hash_file(path: str) -> str:
    h = hashlib.new(HASH_ALGO)
    with open(path, "rb") as f:
        while chunk := f.read(BUFFER_SIZE):
            h.update(chunk)
    return h.hexdigest()


# ──────────────────────────────────────────────────────────────────────────────
# MANIFEST GENERATION
# ──────────────────────────────────────────────────────────────────────────────

def generate_manifest():
    entries = []

    for root, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = sorted(d for d in dirs if d not in EXCLUDE_DIRS)
        files = sorted(f for f in files if f not in EXCLUDE_FILES)

        rel_root = os.path.relpath(root, ROOT_DIR)
        if rel_root == ".":
            rel_root = "/"

        entries.append(f"\n[DIR] {rel_root}")

        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, ROOT_DIR)

            try:
                file_hash = hash_file(full_path)
                entries.append(f"{file_hash}  {rel_path}")
            except Exception as e:
                entries.append(f"ERROR     {rel_path}  ({e})")

    return entries


# ──────────────────────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────────────────────

def main():
    timestamp = datetime.utcnow().isoformat() + "Z"

    header = f"""
ASCπ REPOSITORY HASH MANIFEST
============================

Generated: {timestamp}
Root: {ROOT_DIR}
Hash Algorithm: {HASH_ALGO.upper()}

This file provides a deterministic integrity snapshot of the entire
repository structure and contents at generation time.

Any modification to files, filenames, or directory structure will
change this manifest.

"""

    manifest_entries = generate_manifest()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(header.strip() + "\n")
        for line in manifest_entries:
            f.write(line + "\n")

    print(f"[OK] Hash manifest written to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()