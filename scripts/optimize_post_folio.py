"""Optimize only public/Media/post folio into public/optimized/post-folio."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(r"D:\Projects\Portfolio-animated")
sys.path.insert(0, str(ROOT / "scripts"))

from optimize_media import SRC, OUT, mapped_rel, process_file, should_skip  # noqa: E402


def main() -> None:
    folder = SRC / "post folio"
    if not folder.exists():
        raise SystemExit(f"Missing: {folder}")
    files = [p for p in sorted(folder.iterdir()) if p.is_file() and not should_skip(p)]
    print(f"Post folio sources: {len(files)}", flush=True)
    for f in files:
        try:
            process_file(f)
        except Exception as e:
            print(f"  ERROR {f.name}: {e}", flush=True)
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
