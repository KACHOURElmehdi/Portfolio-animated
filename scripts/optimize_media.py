"""
Optimize portfolio Media originals into web-ready WebP derivatives.
Originals in public/Media are never modified.
Output paths are URL-safe (kebab-case, no spaces).
"""
from __future__ import annotations

import re
from pathlib import Path
from PIL import Image

ROOT = Path(r"D:\Projects\Portfolio-animated")
SRC = ROOT / "public" / "Media"
OUT = ROOT / "public" / "optimized"

VARIANTS = {
    "thumb": 800,
    "gallery": 1600,
    "hero": 1200,
}

QUALITY = 86
SKIP_NAMES = {".crdownload", "unconfirmed"}

DIR_MAP = {
    "brand foilio": "brand-folio",
    "packagign": "packaging",
    "print folio": "print-folio",
    "social media": "social-media",
    "post folio": "post-folio",
    "logos": "logos",
}

FILE_STEM_MAP = {
    "thnk u": "thank-you",
    "petcrib brend": "petcrib-brand",
    "artisan brand": "artisan-brand",
    "soda crave": "soda-crave",
    "marani brand": "marani-brand",
    "ZOFI LOGO": "zofi-logo",
    "apex logo": "apex-logo",
    "car wash": "car-wash",
    "01-Friday Cocktail Party Flyer PSD Template": "friday-cocktail",
    "mexico resto": "mexico-resto",
    "visite card": "visite-card",
    "LHAJ ESCO ONE": "lhaj-esco-one",
    "MOHAMMED ONE": "mohammed-one",
}


def slugify(value: str) -> str:
    value = value.strip().replace("_", "-")
    value = re.sub(r"[^\w\s-]", "", value, flags=re.UNICODE)
    value = re.sub(r"[\s]+", "-", value)
    return value.lower().strip("-")


def should_skip(path: Path) -> bool:
    name = path.name.lower()
    # Skip incomplete browser downloads and temp files only.
    if path.suffix.lower() == ".crdownload":
        return True
    if name.startswith("unconfirmed"):
        return True
    return any(s in name for s in SKIP_NAMES)


def mapped_rel(src: Path) -> Path:
    parts = list(src.relative_to(SRC).parts)
    out_parts: list[str] = []
    for i, part in enumerate(parts):
        if i < len(parts) - 1:
            out_parts.append(DIR_MAP.get(part, slugify(part)))
        else:
            stem = Path(part).stem
            mapped = FILE_STEM_MAP.get(stem, slugify(stem))
            out_parts.append(mapped)
    return Path(*out_parts)


def save_webp(im: Image.Image, dest: Path, max_edge: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    has_alpha = "A" in im.getbands() or im.mode in ("RGBA", "LA", "P")
    img = im.convert("RGBA") if has_alpha else im.convert("RGB")

    if img.mode == "RGBA":
        alpha = img.getchannel("A")
        if alpha.getextrema()[0] >= 250:
            img = img.convert("RGB")

    w, h = img.size
    scale = min(1.0, max_edge / max(w, h))
    if scale < 1.0:
        nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
        img = img.resize((nw, nh), Image.Resampling.LANCZOS)

    img.save(dest, "WEBP", quality=QUALITY, method=4)
    print(f"  -> {dest.relative_to(ROOT)} ({img.size[0]}x{img.size[1]})", flush=True)


def copy_svg(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(src.read_bytes())
    print(f"  -> {dest.relative_to(ROOT)} (svg copy)", flush=True)


def process_file(src: Path) -> None:
    rel = mapped_rel(src)
    print(f"OPT {src.relative_to(SRC)} => {rel}", flush=True)
    suffix = src.suffix.lower()

    if suffix == ".svg":
        copy_svg(src, OUT / f"{rel}.svg")
        return

    if suffix not in {".png", ".jpg", ".jpeg", ".webp", ".gif"}:
        print("  skip unsupported", flush=True)
        return

    with Image.open(src) as im:
        im.load()
        stem_dir = OUT / rel
        for name, edge in VARIANTS.items():
            save_webp(im, stem_dir / f"{name}.webp", edge)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")

    files = [p for p in sorted(SRC.rglob("*")) if p.is_file() and not should_skip(p)]
    print(f"Found {len(files)} source files", flush=True)
    for f in files:
        try:
            process_file(f)
        except Exception as e:
            print(f"  ERROR {f}: {e}", flush=True)
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
