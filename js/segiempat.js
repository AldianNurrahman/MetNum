
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

