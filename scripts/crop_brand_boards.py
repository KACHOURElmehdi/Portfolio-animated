"""
Crop brand presentation boards into curated gallery assets.
Uses only regions from existing Media originals — no fabricated mockups.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(r"D:\Projects\Portfolio-animated")
OUT = ROOT / "public" / "optimized"
VARIANTS = {"thumb": 800, "gallery": 1600, "hero": 1200}
QUALITY = 84

# (stem_under_brand-folio, source_png, crops: name -> box LTRB in source pixels)
BOARDS = [
    {
        "src": ROOT / "public/Media/brand foilio/petcrib brend.png",
        "prefix": "brand-folio",
        "crops": {
            # Left brand system column
            "petcrib-system": (48, 48, 930, 1768),
            # Right applications
            "petcrib-wall": (955, 55, 1705, 640),
            "petcrib-exterior": (955, 655, 1705, 1205),
            "petcrib-uniforms": (955, 1220, 1705, 1765),
        },
    },
    {
        "src": ROOT / "public/Media/brand foilio/artisan brand.png",
        "prefix": "brand-folio",
        "crops": {
            "artisan-system": (48, 48, 900, 1705),
            "artisan-logo": (920, 48, 1705, 560),
            "artisan-web": (920, 575, 1705, 1120),
            "artisan-packaging": (920, 1140, 1705, 1705),
        },
    },
    {
        "src": ROOT / "public/Media/brand foilio/soda crave.png",
        "prefix": "brand-folio",
        "crops": {
            # Native 362×320 2×2 board
            "soda-grape": (4, 4, 178, 156),
            "soda-logo": (184, 4, 358, 156),
            "soda-citrus": (4, 164, 178, 316),
            "soda-strawberry": (184, 164, 358, 316),
        },
    },
]


def export_variants(im: Image.Image, dest_dir: Path) -> None:
    dest_dir.mkdir(parents=True, exist_ok=True)
    base = im.convert("RGB") if im.mode in ("RGBA", "P") else im.convert("RGB")
    for name, max_side in VARIANTS.items():
        frame = base.copy()
        frame.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        frame.save(dest_dir / f"{name}.webp", "WEBP", quality=QUALITY, method=4)


def main() -> None:
    for board in BOARDS:
        src: Path = board["src"]
        print(f"Opening {src.name}…")
        master = Image.open(src)
        for stem, box in board["crops"].items():
            crop = master.crop(box)
            out = OUT / board["prefix"] / stem
            export_variants(crop, out)
            print(f"  + {out.relative_to(ROOT)}  ({crop.size[0]}×{crop.size[1]})")
    print("Done.")


if __name__ == "__main__":
    main()
