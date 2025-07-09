document.getElementById("hitung").addEventListener("click", function () {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const nInput = document.getElementById("n").value;
  const hInput = document.getElementById("h").value;
  const eksakInput = document.getElementById("eksak").value;
  const fungsiInput = document.getElementById("fungsi").value.trim();

  if (isNaN(a) || isNaN(b) || !fungsiInput) {
    alert("Harap isi batas a, b, dan fungsi dengan benar.");
    return;
  }

  let n = parseInt(nInput);
  let h = parseFloat(hInput);

  if (isNaN(n) && isNaN(h)) {
    alert("Isi jumlah partisi (n) atau nilai h salah satunya.");
    return;
  }

  if (!isNaN(n) && isNaN(h)) {
    h = (b - a) / n;
  } else if (isNaN(n) && !isNaN(h)) {
    n = Math.floor((b - a) / h);
    h = (b - a) / n;
  }

  // Parsing fungsi
  let fx;
  try {
    let parsed = fungsiInput
      .replace(/exp\(([^)]+)\)/g, 'Math.exp($1)')
      .replace(/e\^([a-zA-Z0-9\+\-\*\/\^]+)/g, 'Math.exp($1)')
      .replace(/\^/g, '**'); // x^2 jadi x**2

    fx = function (x) {
      const expr = parsed.replace(/x/g, `(${x})`);
      return eval(expr);
    };
  } catch (e) {
    alert("Fungsi tidak valid.");
    return;
  }

  // Hitung titik tengah
  const xMid = [], fxMid = [];
  for (let i = 0; i < n; i++) {
    const xi = a + i * h;
    const mid = xi + h / 2;
    xMid.push(mid);
    fxMid.push(fx(mid));
  }

  // Hitung luas pendekatan
  const total = fxMid.reduce((a, b) => a + b, 0);
  const luas = h * total;

  const eksak = eksakInput ? parseFloat(eksakInput) : luas;
  const galat = Math.abs((luas - eksak) / eksak);

  // Output hasil
  document.getElementById("hasil").innerHTML = `
    <p><strong>Luas Pias Gabungan:</strong> ${luas.toFixed(8)}</p>
    <p><strong>Nilai Eksak:</strong> ${eksak.toFixed(8)}</p>
    <p><strong>Galat Relatif:</strong> ${galat.toFixed(8)}</p>
  `;

  // Tabel titik tengah
  let tabelHTML = `
    <h3>Tabel Titik Tengah dan f(x)</h3>
    <table>
      <tr><th>i</th><th>titik tengah</th><th>f(titik)</th></tr>
  `;
  for (let i = 0; i < n; i++) {
    tabelHTML += `<tr><td>${i + 1}</td><td>${xMid[i].toFixed(4)}</td><td>${fxMid[i].toFixed(6)}</td></tr>`;
  }
  tabelHTML += `</table>`;
  document.getElementById("tabel").innerHTML = tabelHTML;
});
