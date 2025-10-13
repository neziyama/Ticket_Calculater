// script.js
// BigInt を使って大きな整数にも対応。
// 入力は整数文字列のみ受け付ける（小数・空白は不可）。

const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const solveBtn = document.getElementById("solveBtn");
const resultDiv = document.getElementById("result");

// 整数（符号付き）文字列かを判定
function isIntegerString(s) {
  return /^-?\d+$/.test(s.trim());
}

// 表示用に BigInt を普通の文字列に変換（負のゼロなどの問題なし）
function bigIntToStr(n) {
  return n.toString();
}

solveBtn.addEventListener("click", () => {
  const aStr = aInput.value.trim();
  const bStr = bInput.value.trim();

  // バリデーション
  if (!isIntegerString(aStr) || !isIntegerString(bStr)) {
    resultDiv.style.color = "var(--warn)";
    resultDiv.textContent = "⚠️ a と b は非負整数（例: 1, 0, 15 etc.）で入力してください。";
    return;
  }

  try {
    const a = BigInt(aStr);
    const b = BigInt(bStr);

    // 計算 (BigInt)
    // y = (a - 540*b) / 20  が整数であることを確認
    const twenty = 20n;
    const fiveForty = 540n;

    const numerator = a - fiveForty * b;
    const remainder = numerator % twenty;

    if (remainder !== 0n) {
      resultDiv.style.color = "var(--warn)";
      // remainder が負になる場合を分かりやすく表示するため absolute 取らないでそのまま示す
      resultDiv.textContent =
        "❌ 整数解は存在しません。\n" +
        `理由: y = (a - 540*b) / 20 となりますが、分子 (a - 540*b) = ${numerator.toString()} は 20 で割り切れません（余り ${remainder.toString()}）。`;
      return;
    }

    const y = numerator / twenty;
    const x = b - y;

    resultDiv.style.color = "var(--ok)";
    resultDiv.textContent =
      "✅ 整数解が見つかりました。\n" +
      `x(540円のチケットの枚数) = ${bigIntToStr(x)}\n` +
      `y(560円のチケットの枚数) = ${bigIntToStr(y)}\n\n` +
      "（計算メモ）\n" +
      `y = (a - 540·b) / 20 = (${a.toString()} - 540·${b.toString()}) / 20 = ${numerator.toString()} / 20`;
  } catch (err) {
    resultDiv.style.color = "var(--warn)";
    resultDiv.textContent = "エラーが発生しました。入力が非常に大きすぎる等、予期せぬ値の可能性があります。";
    console.error(err);
  }
});
