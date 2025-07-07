document.getElementById('form-titik-tengah').addEventListener('submit', function (e) {
  e.preventDefault();

  const f = document.getElementById('fungsi').value;
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);
  const dx = (b - a) / n;
  let total = 0;
  let table = '<h2>Hasil Perhitungan:</h2><table border="1"><tr><th>i</th><th>xi tengah</th><th>f(xi)</th><th>f(xi)*dx</th></tr>';

  for (let i = 0; i < n; i++) {
    const xi = a + (i + 0.5) * dx;
    const fxi = math.evaluate(f, { x: xi });
    const luas = fxi * dx;
    total += luas;
    table += `<tr><td>${i + 1}</td><td>${xi.toFixed(5)}</td><td>${fxi.toFixed(5)}</td><td>${luas.toFixed(5)}</td></tr>`;
  }

  const integral = math.integrate(f, 'x');
  const Fx = math.compile(integral.toString());
  const eksak = Fx.evaluate({ x: b }) - Fx.evaluate({ x: a });
  const galat = Math.abs(total - eksak) / Math.abs(eksak);

  table += `</table>
    <p><strong>Nilai Pendekatan:</strong> ${total.toFixed(8)}</p>
    <p><strong>Nilai Eksak:</strong> ${eksak.toFixed(8)}</p>
    <p><strong>Galat Relatif:</strong> ${galat.toExponential(5)}</p>`;

  document.getElementById('output-titik-tengah').innerHTML = table;
});