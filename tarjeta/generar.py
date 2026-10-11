"""Genera tarjeta.html (copiando los dibujos de index.html) e invitacion-fernanda.png.

Uso (desde la carpeta del proyecto):  python tarjeta/generar.py
"""
import re
import subprocess
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

idx = (RAIZ / "index.html").read_text(encoding="utf-8")
defs = re.search(r'<svg class="svg-defs".*?</svg>\n', idx, re.S).group(0)
# En la tarjeta el castillo va más pequeño para que se vea completo debajo del QR
defs = defs.replace('<use href="#castilloHD" x="136" y="66" width="128" height="128"/>',
                    '<use href="#castilloHD" x="158" y="108" width="84" height="84"/>')
plantilla = (AQUI / "plantilla.html").read_text(encoding="utf-8")
(AQUI / "tarjeta.html").write_text(plantilla.replace("<!--DEFS-->", defs), encoding="utf-8")

salida = AQUI / "invitacion-fernanda.png"
subprocess.run([
    CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--allow-file-access-from-files", "--force-device-scale-factor=1",
    "--window-size=1080,1920", "--virtual-time-budget=8000",
    f"--screenshot={salida}", (AQUI / "tarjeta.html").as_uri(),
], check=True, capture_output=True)
print("Listo:", salida)
