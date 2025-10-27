const resultDiv = document.getElementById("result");
const historyList = document.getElementById("history");
const clearBtn = document.getElementById("clearHistoryBtn");

document.getElementById("solveBtn").addEventListener("click", () => {
  const cVal = document.getElementById("c").value.trim();
  const eVal = document.getElementById("e").value.trim();
  const dVal = document.getElementById("d").value.trim();

  // 入力チェック
  if (![cVal, eVal, dVal].every(v => /^-?\d+$/.test(v))) {
    resultDiv.style.color = "var(--warn)";
    resultDiv.textContent = "⚠️ 整数で入力してください。";
    return;
  }

  const c = BigInt(cVal);
  const e = BigInt(eVal);
  const d = BigInt(dVal);

  // 与式より a, b を計算
  const b = c - d;
  const a = e - 540n * d;

  // y = (a - 520b) / 40
  const numerator = a - 520n * b;
  const denominator = 40n;

  let message = "";
  let isRejected = false;
  let x, y;

  if (numerator % denominator !== 0n) {
    message = `❌ 棄却：整数になりません。`;
    isRejected = true;
  } else {
    y = numerator / denominator;
    x = b - y;

    if (x < 0n || y < 0n) {
      message = `❌ 棄却：答えが正しくありません。`;
      isRejected = true;
    } else {
      message = `✅ 解：520円のチケット枚数(x)=${x}枚, 560円のチケット枚数(y)=${y}枚`;
    }
  }

  // 結果を表示
  resultDiv.style.color = isRejected ? "var(--warn)" : "var(--ok)";
  resultDiv.textContent = message;

  // 履歴に追加
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>チケット総数=${c}枚</strong>, 総額=${e}円, 540円のチケット枚数=${d}枚 → 
    ${isRejected ? "<span style='color:var(--warn)'>棄却</span>" :
      `<span style='color:var(--ok)'>520円のチケット枚数(x)=${x}枚, 560円のチケット枚数(y)=${y}枚</span> `}
  `;
  historyList.prepend(li);
});

// 履歴クリアボタン
clearBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
  resultDiv.textContent = "";
});
