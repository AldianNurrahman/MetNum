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

  let fx;
  try {
    let parsed = fungsiInput
      .replace(/exp\(([^)]+)\)/gi, 'Math.exp($1)')
      .replace(/e\^([a-zA-Z0-9\+\-\*\/\^]+)/gi, 'Math.exp($1)')
      .replace(/\^/g, '**');

    fx = function (x) {
      const expr = parsed.replace(/x/g, `(${x})`);
      const hasil = eval(expr);
      if (isNaN(hasil)) throw new Error("Hasil fungsi NaN");
      return hasil;
    };
  } catch (e) {
    alert("Fungsi f(x) tidak valid. Gunakan bentuk seperti 'x^2' atau 'exp(x)'.");
    return;
  }

  // Luas Pias Gabungan (Metode Segiempat)
  const xi = [], fxi = [];
  for (let i = 0; i <= n; i++) {
    xi[i] = a + i * h;
    fxi[i] = fx(xi[i]);
  }

  let total = fxi[0] + fxi[n];
  for (let i = 1; i < n; i++) {
    total += 2 * fxi[i];
  }

  const luasGabungan = (h / 2) * total;

  // Hitung Eksak (dengan metode Titik Tengah partisi besar)
  let eksak = parseFloat(eksakInput);
  if (isNaN(eksak)) {
    let N = 10000;
    let hh = (b - a) / N;
    let sum = 0;
    for (let i = 0; i < N; i++) {
      const tengah = a + i * hh + hh / 2;
      sum += fx(tengah);
    }
    eksak = hh * sum;
  }

  const galat = Math.abs((luasGabungan - eksak) / eksak);

  document.getElementById("hasil").innerHTML = `
    <p><strong>Luas Pias Gabungan:</strong> ${luasGabungan.toFixed(8)}</p>
    <p><strong>Nilai Eksak (dengan metode titik tengah 10.000 partisi):</strong> ${eksak.toFixed(8)}</p>
    <p><strong>Galat Relatif:</strong> ${galat.toFixed(8)}</p>
  `;

  let tabelHTML = `
    <h3>Tabel xi dan f(xi)</h3>
    <table>
      <tr><th>i</th><th>xi</th><th>f(xi)</th></tr>
  `;
  for (let i = 0; i <= n; i++) {
    tabelHTML += `<tr><td>${i}</td><td>${xi[i].toFixed(4)}</td><td>${fxi[i].toFixed(6)}</td></tr>`;
  }
  tabelHTML += `</table>`;
  document.getElementById("tabel").innerHTML = tabelHTML;
});
