import json
import re
import urllib.request
from pathlib import Path
from typing import List
from PIL import Image, ImageDraw, ImageFont


ROOT = Path('/Users/gushuang/Documents/学习资料/demo-AI/用户端')
APP_FILE = ROOT / 'App.vue'
ICON_DIR = ROOT / 'static' / 'icons'
FONT_PATH = ROOT / 'static' / 'MaterialSymbolsOutlined.ttf'
FONT_WOFF2_PATH = ROOT / 'static' / 'MaterialSymbolsOutlined.woff2'
CODEPOINTS_PATH = ROOT / 'static' / 'MaterialSymbolsOutlined.codepoints'
FONT_WOFF2_URL = 'https://fonts.gstatic.com/s/materialsymbolsoutlined/v325/kJEPBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzBwG-RpA6RzaxHMPdY40KH8nGzv3fzfVJO1USv9ls.woff2'
CODEPOINTS_URL = 'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints'

TEXT_PATTERN = re.compile(r'<text(?P<attrs>[^>]*)>(?P<body>.*?)</text>', re.S)
CLASS_PATTERN = re.compile(r'class=(?P<q>["\'])(?P<val>.*?)(?P=q)', re.S)


def clean_attrs(attrs: str) -> str:
    match = CLASS_PATTERN.search(attrs)
    if not match:
        return attrs
    classes = match.group('val').split()
    classes = [item for item in classes if item != 'material-symbols-outlined']
    if classes:
        replacement = f'class={match.group("q")}{" ".join(classes)}{match.group("q")}'
        return attrs[: match.start()] + replacement + attrs[match.end() :]
    return attrs[: match.start()] + attrs[match.end() :]


def replace_material_icon_text(text: str) -> str:
    def repl(match):
        attrs = match.group('attrs')
        if 'material-symbols-outlined' not in attrs:
            return match.group(0)

        body = match.group('body').strip()
        if '<' in body:
            return match.group(0)

        new_attrs = clean_attrs(attrs)
        if re.fullmatch(r'\{\{\s*.+?\s*\}\}', body, re.S):
            expression = body[2:-2].strip()
            return f'<LocalIcon{new_attrs} :name="{expression}" />'

        if re.fullmatch(r'[a-z0-9_]+', body):
            return f'<LocalIcon{new_attrs} name="{body}" />'

        return match.group(0)

    return TEXT_PATTERN.sub(repl, text)


def collect_icons() -> List[str]:
    icons = set()
    for path in ROOT.rglob('*.vue'):
        text = path.read_text(encoding='utf-8')
        icons.update(re.findall(r'name="([a-z0-9_]+)"', text))
        for first, second in re.findall(r":name=\"mode === 'pickup' \? '([a-z0-9_]+)' : '([a-z0-9_]+)'\"", text):
            icons.add(first)
            icons.add(second)
        for item in re.findall(r"(?:icon|bgIcon):\s*'([^']+)'", text):
            if re.fullmatch(r'[a-z0-9_]+', item):
                icons.add(item)
    icons.discard('none')
    icons.discard('success')
    return sorted(icons)


def ensure_font_assets():
    if not FONT_PATH.exists():
        if not FONT_WOFF2_PATH.exists():
            with urllib.request.urlopen(FONT_WOFF2_URL, timeout=60) as response:
                FONT_WOFF2_PATH.write_bytes(response.read())
        from fontTools.ttLib import TTFont
        font = TTFont(str(FONT_WOFF2_PATH))
        font.flavor = None
        font.save(str(FONT_PATH))
    if not CODEPOINTS_PATH.exists():
        with urllib.request.urlopen(CODEPOINTS_URL, timeout=60) as response:
            CODEPOINTS_PATH.write_bytes(response.read())


def load_codepoints():
    mapping = {}
    for line in CODEPOINTS_PATH.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line:
            continue
        name, codepoint = line.split()
        mapping[name] = codepoint
    return mapping


def ensure_icons(icons: List[str]) -> List[str]:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    ensure_font_assets()
    codepoints = load_codepoints()
    missing = []
    font = ImageFont.truetype(str(FONT_PATH), size=96)

    for icon in icons:
        codepoint = codepoints.get(icon)
        if codepoint is None:
            missing.append(icon)
            continue

        png_path = ICON_DIR / f'{icon}.png'
        image = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
        draw = ImageDraw.Draw(image)
        glyph = chr(int(codepoint, 16))
        bbox = draw.textbbox((0, 0), glyph, font=font)
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        x = (128 - width) / 2 - bbox[0]
        y = (128 - height) / 2 - bbox[1]
        draw.text((x, y), glyph, fill=(0, 0, 0, 255), font=font)
        image.save(png_path)
        if not png_path.exists():
            raise RuntimeError(f'PNG not generated for {icon}')

    return missing


def main():
    changed = []
    vue_files = list(ROOT.rglob('*.vue')) + [APP_FILE]
    for path in vue_files:
        text = path.read_text(encoding='utf-8')
        new_text = replace_material_icon_text(text)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
            changed.append(path)

    icons = collect_icons()
    missing = ensure_icons(icons)

    print('changed_files', len(changed))
    for item in changed:
        print(item.relative_to(ROOT))
    print('icon_count', len(icons))
    print('missing_icons', ','.join(missing) if missing else 'none')


if __name__ == '__main__':
    main()
