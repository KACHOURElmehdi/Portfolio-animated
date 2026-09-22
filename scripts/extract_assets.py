from PIL import Image
from pathlib import Path
import pymupdf

assets = Path(
    r"C:\Users\simob\.cursor\projects\d-Projects-Portfolio-animated\assets"
)
out = Path(r"D:\Projects\Portfolio-animated\public\Projects")

fourth = assets / "c__Users_simob_AppData_Roaming_Cursor_User_workspaceStorage_28af639c23529c46673192d76f4695f6_images_Fourth-bd78d84f-0267-45fd-a8ee-7737e240e7e3.png"
fifth = assets / "c__Users_simob_AppData_Roaming_Cursor_User_workspaceStorage_28af639c23529c46673192d76f4695f6_images_Fifth-4558adbf-3db9-452e-b5e6-4dae695e4792.png"
third = assets / "c__Users_simob_AppData_Roaming_Cursor_User_workspaceStorage_28af639c23529c46673192d76f4695f6_images_Third-92ca51f5-7f5f-45a1-9ed3-b21129367cb3.png"
sixth = assets / "c__Users_simob_AppData_Roaming_Cursor_User_workspaceStorage_28af639c23529c46673192d76f4695f6_images_Sixth-8b5810f9-7041-445e-9fe0-172d951204fe.png"
seventh = assets / "c__Users_simob_AppData_Roaming_Cursor_User_workspaceStorage_28af639c23529c46673192d76f4695f6_images_Seventh-4cabb221-7aa4-4455-b8ed-ac3753ece703.png"


def save_crop(img_path: Path, box: tuple[int, int, int, int], dest: Path, scale: int = 3) -> None:
    im = Image.open(img_path).convert("RGB")
    crop = im.crop(box)
    w, h = crop.size
    crop = crop.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    crop.save(dest, "WEBP", quality=88, method=6)
    print(f"saved {dest} {crop.size}")


# Fourth: Petcrib + Artisan
img = Image.open(fourth)
W, H = img.size
print("fourth", W, H)
save_crop(fourth, (0, 40, W, int(H * 0.48)), out / "petcrib" / "01_overview.webp")
save_crop(fourth, (0, int(H * 0.08), W, int(H * 0.28)), out / "petcrib" / "02_logo.webp")
save_crop(fourth, (0, int(H * 0.22), W, int(H * 0.42)), out / "petcrib" / "03_mockups.webp")
save_crop(fourth, (0, int(H * 0.48), W, int(H * 0.98)), out / "artisan" / "01_overview.webp")
save_crop(fourth, (0, int(H * 0.52), W, int(H * 0.72)), out / "artisan" / "02_identity.webp")
save_crop(fourth, (0, int(H * 0.72), W, int(H * 0.98)), out / "artisan" / "03_packaging.webp")

# Fifth: Soda Crave + Post Folio
img = Image.open(fifth)
W, H = img.size
print("fifth", W, H)
save_crop(fifth, (0, 20, W, int(H * 0.42)), out / "soda-crave" / "01_overview.webp")
save_crop(fifth, (0, int(H * 0.05), W, int(H * 0.22)), out / "soda-crave" / "02_cans.webp")
save_crop(fifth, (0, int(H * 0.18), W, int(H * 0.38)), out / "soda-crave" / "03_flavors.webp")
save_crop(fifth, (0, int(H * 0.55), W, int(H * 0.98)), out / "post-folio" / "01_grid.webp")

# Third: Logo Folio
img = Image.open(third)
W, H = img.size
print("third", W, H)
save_crop(third, (0, int(H * 0.08), W, int(H * 0.45)), out / "logo-folio" / "01_top-ten.webp")
save_crop(third, (0, int(H * 0.55), W, H), out / "logo-folio" / "02_brand-header.webp")

# Sixth: Print / Social
img = Image.open(sixth)
W, H = img.size
print("sixth", W, H)
save_crop(sixth, (0, int(H * 0.05), W, int(H * 0.55)), out / "post-folio" / "02_print-grid.webp")
save_crop(sixth, (0, int(H * 0.55), W, H), out / "post-folio" / "03_social.webp")

# Seventh: Product packaging section
img = Image.open(seventh)
W, H = img.size
print("seventh", W, H)
save_crop(seventh, (0, int(H * 0.35), W, int(H * 0.75)), out / "packaging" / "01_menarini.webp")
save_crop(seventh, (0, int(H * 0.08), W, int(H * 0.35)), out / "packaging" / "02_recent.webp")

pdfs = [
    (
        Path(
            r"C:\Users\simob\OneDrive - Ynov\Aymen\Zofenil Plus\110BN9_FB_A.02 ZOFENIL PLUS 28CPR MA CP (2).pdf"
        ),
        out / "packaging" / "03_zofenil-plus.webp",
    ),
    (
        Path(
            r"C:\Users\simob\OneDrive - Ynov\Aymen\F.P\Spasmomen\PDF\Flyer Spasmomen 15x21cm VF.pdf"
        ),
        out / "packaging" / "04_spasmomen-flyer.webp",
    ),
]

for pdf_path, dest in pdfs:
    if not pdf_path.exists():
        print("missing", pdf_path)
        continue
    doc = pymupdf.open(pdf_path)
    page = doc[0]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    max_side = 1600
    ratio = min(max_side / im.width, max_side / im.height, 1.0)
    if ratio < 1:
        im = im.resize((int(im.width * ratio), int(im.height * ratio)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=85, method=6)
    print(f"pdf->{dest} {im.size}")
    doc.close()

print("DONE")
