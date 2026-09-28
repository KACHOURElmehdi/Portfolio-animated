"""
Re-encode oversized optimized gallery.webp files from Media originals.
Only touches files currently > TARGET_BYTES. Preserves visual quality with
quality laddering — stops when under budget or quality floor is hit.
"""
from __future__ import annotations

import re
from pathlib import Path
from PIL import Image

ROOT = Path(r"D:\Projects\Portfolio-animated")
SRC = ROOT / "public" / "Media"
OUT = ROOT / "public" / "optimized"
TARGET_BYTES = 380 * 1024
MAX_EDGE = 1600
QUALITY_STEPS = [82, 78, 74, 70]

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


def mapped_stem(src: Path) -> Path:
    parts = list(src.relative_to(SRC).parts)
    out_parts: list[str] = []
    for i, part in enumerate(parts):
        if i < len(parts) - 1:
            out_parts.append(DIR_MAP.get(part, slugify(part)))
        else:
            stem = Path(part).stem
            out_parts.append(FILE_STEM_MAP.get(stem, slugify(stem)))
    return Path(*out_parts)


def prepare(im: Image.Image) -> Image.Image:
    has_alpha = "A" in im.getbands() or im.mode in ("RGBA", "LA", "P")
    img = im.convert("RGBA") if has_alpha else im.convert("RGB")
    if img.mode == "RGBA":
        alpha = img.getchannel("A")
        if alpha.getextrema()[0] >= 250:
            img = img.convert("RGB")
    w, h = img.size
    scale = min(1.0, MAX_EDGE / max(w, h))
    if scale < 1.0:
        img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.Resampling.LANCZOS)
    return img


def save_ladder(img: Image.Image, dest: Path) -> tuple[int, int]:
    dest.parent.mkdir(parents=True, exist_ok=True)
    last_q = QUALITY_STEPS[-1]
    for q in QUALITY_STEPS:
        last_q = q
        img.save(dest, "WEBP", quality=q, method=6)
        if dest.stat().st_size <= TARGET_BYTES:
            break
    return dest.stat().st_size, last_q


def main() -> None:
    heavy = sorted(
        [p for p in OUT.rglob("gallery.webp") if p.stat().st_size > TARGET_BYTES],
        key=lambda p: -p.stat().st_size,
    )
    print(f"Heavy gallery files: {len(heavy)}", flush=True)

    # Build reverse map: optimized stem -> Media source
    sources: dict[str, Path] = {}
    for src in SRC.rglob("*"):
        if not src.is_file():
            continue
        if src.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        sources[str(mapped_stem(src)).replace("\\", "/")] = src

    for gallery_path in heavy:
        # .../optimized/<stem>/gallery.webp
        stem = gallery_path.parent.relative_to(OUT).as_posix()
        before = gallery_path.stat().st_size
        src = sources.get(stem)
        if not src:
            print(f"SKIP {stem} (no Media original)", flush=True)
            continue
        with Image.open(src) as im:
            im.load()
            prepared = prepare(im)
            size, q = save_ladder(prepared, gallery_path)
            # refresh hero/thumb from same prepare at their edges
            for name, edge in (("hero", 1200), ("thumb", 800)):
                frame = prepared.copy()
                w, h = frame.size
                scale = min(1.0, edge / max(w, h))
                if scale < 1.0:
                    frame = frame.resize(
                        (max(1, int(w * scale)), max(1, int(h * scale))),
                        Image.Resampling.LANCZOS,
                    )
                out = gallery_path.parent / f"{name}.webp"
                frame.save(out, "WEBP", quality=min(q + 2, 84), method=6)
        print(
            f"OK {stem}: {before // 1024}KB -> {size // 1024}KB (q={q})",
            flush=True,
        )
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
