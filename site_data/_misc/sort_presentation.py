"""発表・活動・プレスリリースを、元の書式を保って日付降順に並べる。"""

import argparse
from datetime import date
from pathlib import Path
import re

import yaml


DATA_DIR = Path(__file__).resolve().parents[1]
DEFAULT_FILES = [
    DATA_DIR / site / filename
    for site in ("group", "personal")
    for filename in ("presentation.yml", "activity.yml", "press_releases.yml")
    if (DATA_DIR / site / filename).exists()
]


def date_key(item):
    value = item["date"]
    # 期間は、表示側と同じく先頭の開始日で比較する。
    if isinstance(value, list):
        value = value[0]
    if value is None or str(value).upper() == "TBA":
        return date.min
    if isinstance(value, date):
        return value
    # 既存のゼロ埋めされていない月日も、原文を変えずに扱う。
    return date(*map(int, str(value).split("-")))


def sort_text(source):
    items = yaml.safe_load(source) or []
    if not items:
        return source
    lines = source.splitlines(keepends=True)
    starts = [i for i, line in enumerate(lines) if re.match(r"^-\s", line)]
    if len(starts) != len(items):
        raise ValueError("トップレベルの項目境界を確認してください")
    # 項目直前のコメントは、その項目と一緒に移動する。冒頭の説明は固定。
    for index in range(1, len(starts)):
        while lines[starts[index] - 1].startswith("#"):
            starts[index] -= 1
    header = "".join(lines[:starts[0]])
    ends = starts[1:] + [len(lines)]
    blocks = ["".join(lines[start:end]) for start, end in zip(starts, ends)]
    order = sorted(range(len(items)), key=lambda i: date_key(items[i]), reverse=True)
    if order == list(range(len(items))):
        return source
    # 末尾項目の移動時の連結を防ぎ、既存の空行は各項目に残す。
    if not blocks[-1].endswith("\n"):
        blocks[-1] += "\n"
    result = header + "".join(blocks[i] for i in order)
    if not source.endswith("\n"):
        result = result[:-1]
    if yaml.safe_load(result) != [items[i] for i in order]:
        raise ValueError("並べ替えでデータが変化しました")
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", nargs="*", type=Path, help="省略時は両サイトの時系列YAML")
    parser.add_argument("--check", action="store_true", help="ファイルを変更せず順序を確認")
    args = parser.parse_args()
    needs_sort = False
    for path in args.files or DEFAULT_FILES:
        source = path.read_text(encoding="utf-8")
        result = sort_text(source)
        if source != result:
            needs_sort = True
            if not args.check:
                path.write_text(result, encoding="utf-8")
            print(f"{'要ソート' if args.check else 'ソート済み'}: {path}")
        else:
            print(f"確認OK: {path}")
    return int(args.check and needs_sort)


if __name__ == "__main__":
    raise SystemExit(main())
