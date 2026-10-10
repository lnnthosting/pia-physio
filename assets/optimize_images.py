from pathlib import Path

from PIL import Image


ROOT = Path(__file__).parent
# Original uploads stay in this folder. Optimized web copies are written beside
# them with the `-web.jpg` suffix, so an uploaded photo is never overwritten.
OUTPUT = ROOT

# Keep enough pixels for high-density displays while avoiding camera-original sizes.
IMAGES = {
    #"hof-front.JPG": ("hero.jpg", 1920, 82),
    #"portrait-3-4.jpg": ("portrait.jpg", 900, 82),
    #"praxisraum-1.JPG": ("praxisraum-1.jpg", 1600, 80),
    #"eingangsbereich.JPG": ("eingangsbereich.jpg", 1000, 80),
    #"namensschild.JPG": ("namensschild.jpg", 1000, 80),
    #"placeholder.jpg": ("neuraltherapie.jpg", 720, 82),
    #"schroepfen-small.png": ("schroepfen.jpg", 900, 82),
    #"dry-needleing-small.png": ("dry-needling.jpg", 1000, 82),
    #"blutgel.JPG": ("blutegel.jpg", 900, 80),
    #"blutegel-detail.JPG": ("blutegel-detail.jpg", 1600, 80),
    #"manuelle-therapie.JPG": ("manuelle-therapie.jpg", 1600, 80),
    #"tapen-small.png": ("kinesiotape.jpg", 900, 82),
    #"massage.png": ("massage.jpg", 687, 82),
    # New camera-original uploads. Their output names deliberately differ from
    # the source names; update HTML to use the generated `-web.jpg` copy.
    "neuraltherapie.jpg": ("neuraltherapie-web.jpg", 1000, 80),
    "Praxisraum-1.jpg": ("praxisraum-1-web.jpg", 1600, 80),
    "Praxisraum-2.jpg": ("praxisraum-2-web.jpg", 1600, 80),
}


def optimize(source_name: str, target_name: str, max_width: int, quality: int) -> None:
    with Image.open(ROOT / source_name) as source:
        image = source.convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.LANCZOS)
        image.save(
            OUTPUT / target_name,
            "JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )


OUTPUT.mkdir(exist_ok=True)
for source, settings in IMAGES.items():
    optimize(source, *settings)
