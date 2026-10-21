#!/usr/bin/env python3
"""Prepares the images you upload, so you only have to use the right file name.

Put your files in the folders below (any of .png .jpg .jpeg .webp), with the names from the README table:
    public/projects/attenda-1.png ...      screenshots (resized to 1600 px wide)
    public/certs/oracle-oci-foundations.jpg ...   certificates (1400 px wide)
    public/photo.jpg                       your photo (1000 px wide)
Then run:  python3 tools/optimize_images.py

What it does for each .png/.jpg/.jpeg:
  - fixes phone rotation, removes EXIF data (GPS and camera info), shrinks it, saves a .webp with the same name
  - moves the original into  originals/  (outside public, so it is never published)
Files that are already .webp are left alone unless they are larger than the target width.
Needs Pillow once:  pip install --user pillow
"""
import pathlib
import shutil
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is missing. Run:  pip install --user pillow   (then run this script again)")

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ORIGINALS = ROOT / "originals"
TARGETS = [  # (folder, max width, glob only for top-level photo)
    (PUBLIC / "projects", 1600, "*"),
    (PUBLIC / "certs", 1400, "*"),
    (PUBLIC, 1000, "photo.*"),
]
SRC_EXT = {".png", ".jpg", ".jpeg"}
done = 0


def save_webp(img, dest, width):
    img = ImageOps.exif_transpose(img)
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.mode else "RGB")
    img.save(dest, "WEBP", quality=82, method=6)  # no exif= argument: metadata is dropped


for folder, width, pattern in TARGETS:
    if not folder.is_dir():
        continue
    for f in sorted(folder.glob(pattern)):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        if ext in SRC_EXT:
            dest = f.with_suffix(".webp")
            with Image.open(f) as im:
                save_webp(im, dest, width)
            ORIGINALS.mkdir(exist_ok=True)
            shutil.move(str(f), str(ORIGINALS / f.name))
            print(f"OK   {f.relative_to(ROOT)} -> {dest.name}  ({dest.stat().st_size // 1024} KB)")
            done += 1
        elif ext == ".webp":
            with Image.open(f) as im:
                if im.width > width:
                    save_webp(im.copy(), f, width)
                    print(f"OK   {f.relative_to(ROOT)} shrunk to {width}px wide")
                    done += 1

print(f"\nDone. {done} file(s) processed." if done else "\nNo new .png/.jpg files found. Nothing to do.")
