#!/bin/bash
# TMUA 批量下载脚本
set -e

BASE_DIR="/Users/yumingdong/Downloads/TMUA"
mkdir -p "$BASE_DIR/2023" "$BASE_DIR/2022" "$BASE_DIR/2021" "$BASE_DIR/2020" \
         "$BASE_DIR/2019" "$BASE_DIR/2018" "$BASE_DIR/2017" "$BASE_DIR/2016" \
         "$BASE_DIR/Specimen"

download() {
  local url="$1"
  local path="$2"
  local name=$(basename "$path")
  curl -sL -A "Mozilla/5.0" -o "$BASE_DIR/$path" "$url"
  local size=$(ls -lh "$BASE_DIR/$path" | awk '{print $5}')
  echo "  -> $name ($size)"
}

echo "=== TMUA 历年试卷批量下载 ==="
echo "保存位置: $BASE_DIR"
echo ""

TOTAL=48
CURRENT=0

# --- 2023 ---
echo "[2023]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/04/30144109/TMUA-2023-paper-1.pdf" "2023/TMUA-2023-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/04/30144111/TMUA-2023-paper-2.pdf" "2023/TMUA-2023-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/04/30144123/TMUA-2023-answer-keys.pdf" "2023/TMUA-2023-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105227/TMUA-2023-paper-1-worked-answers.pdf" "2023/TMUA-2023-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105226/TMUA-2023-paper-2-worked-answers.pdf" "2023/TMUA-2023-paper-2-worked-answers.pdf"

# --- 2022 ---
echo "[2022]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141241/TMUA-2022-paper-1.pdf" "2022/TMUA-2022-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141239/TMUA-2022-paper-2.pdf" "2022/TMUA-2022-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141242/TMUA-2022-answer-keys.pdf" "2022/TMUA-2022-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105226/TMUA-2022-paper-1-worked-answers.pdf" "2022/TMUA-2022-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105227/TMUA-2022-paper-2-worked-answers.pdf" "2022/TMUA-2022-paper-2-worked-answers.pdf"

# --- 2021 ---
echo "[2021]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141119/TMUA-2021-paper-1.pdf" "2021/TMUA-2021-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141117/TMUA-2021-paper-2.pdf" "2021/TMUA-2021-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141122/TMUA-2021-answer-keys.pdf" "2021/TMUA-2021-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141121/TMUA-2021-paper-1-worked-answers.pdf" "2021/TMUA-2021-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141118/TMUA-2021-paper-2-worked-answers.pdf" "2021/TMUA-2021-paper-2-worked-answers.pdf"

# --- 2020 ---
echo "[2020]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140953/TMUA-2020-paper-1.pdf" "2020/TMUA-2020-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140951/TMUA-2020-paper-2.pdf" "2020/TMUA-2020-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140956/TMUA-2020-answer-keys.pdf" "2020/TMUA-2020-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140955/TMUA-2020-paper-1-worked-answers.pdf" "2020/TMUA-2020-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140952/TMUA-2020-paper-2-worked-answers.pdf" "2020/TMUA-2020-paper-2-worked-answers.pdf"

# --- 2019 ---
echo "[2019]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140825/TMUA-2019-paper-1.pdf" "2019/TMUA-2019-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140823/TMUA-2019-paper-2.pdf" "2019/TMUA-2019-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140827/TMUA-2019-answer-keys.pdf" "2019/TMUA-2019-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140826/TMUA-2019-paper-1-worked-answers.pdf" "2019/TMUA-2019-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07140824/TMUA-2019-paper-2-worked-answers.pdf" "2019/TMUA-2019-paper-2-worked-answers.pdf"

# --- 2018 ---
echo "[2018]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125407/TMUA-2018-paper-1.pdf" "2018/TMUA-2018-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125404/TMUA-2018-paper-2.pdf" "2018/TMUA-2018-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125413/TMUA-2018-answer-keys.pdf" "2018/TMUA-2018-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125413/TMUA-2018-paper-1-worked-answers.pdf" "2018/TMUA-2018-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125406/TMUA-2018-paper-2-worked-answers.pdf" "2018/TMUA-2018-paper-2-worked-answers.pdf"

# --- 2017 ---
echo "[2017]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125230/TMUA-2017-paper-1.pdf" "2017/TMUA-2017-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125224/TMUA-2017-paper-2.pdf" "2017/TMUA-2017-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125232/TMUA-2017-answer-keys.pdf" "2017/TMUA-2017-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125231/TMUA-2017-paper-1-worked-answers.pdf" "2017/TMUA-2017-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125228/TMUA-2017-paper-2-worked-answers.pdf" "2017/TMUA-2017-paper-2-worked-answers.pdf"

# --- 2016 ---
echo "[2016]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125112/TMUA-2016-paper-1.pdf" "2016/TMUA-2016-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125102/TMUA-2016-paper-2.pdf" "2016/TMUA-2016-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125113/TMUA-2016-answer-keys.pdf" "2016/TMUA-2016-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125113/TMUA-2016-paper-1-worked-answers.pdf" "2016/TMUA-2016-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07125106/TMUA-2016-paper-2-worked-answers.pdf" "2016/TMUA-2016-paper-2-worked-answers.pdf"

# --- Specimen ---
echo "[Specimen]"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141417/TMUA-early-specimen-paper-1.pdf" "Specimen/TMUA-early-specimen-paper-1.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141413/TMUA-early-specimen-paper-2.pdf" "Specimen/TMUA-early-specimen-paper-2.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141414/TMUA-early-specimen-paper-answer-keys.pdf" "Specimen/TMUA-early-specimen-answer-keys.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141418/TMUA-early-specimen-paper-1-worked-answers.pdf" "Specimen/TMUA-early-specimen-paper-1-worked-answers.pdf"
download "https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141415/TMUA-early-specimen-paper-2-worked-answers.pdf" "Specimen/TMUA-early-specimen-paper-2-worked-answers.pdf"

echo ""
echo "=== 下载完成! ==="
echo ""
echo "目录结构:"
find "$BASE_DIR" -name "*.pdf" | sort | while read f; do
  SIZE=$(ls -lh "$f" | awk '{print $5}')
  echo "  $f ($SIZE)"
done
