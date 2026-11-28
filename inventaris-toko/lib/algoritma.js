/**
 * Mencari target secara berurutan dari awal hingga akhir array.
 * @param {Array} arr Array masukan
 * @param {*} target Nilai yang dicari
 * @returns {{ indeks: number, langkah: number }} Indeks (-1 jika tidak ada) dan jumlah langkah
 */
export function linearSearch(arr, target) {
  let langkah = 0;
  for (let i = 0; i < arr.length; i++) {
    langkah++;
    if (arr[i] === target) return { indeks: i, langkah };
  }
  return { indeks: -1, langkah };
}

/**
 * Mencari target pada array terurut dengan membagi dua rentang pencarian.
 * @param {number[]} arr Array angka yang sudah terurut naik
 * @param {number} target Angka yang dicari
 * @returns {{ indeks: number, langkah: number }} Indeks (-1 jika tidak ada) dan jumlah langkah
 */
export function binarySearch(arr, target) {
  let kiri = 0;
  let kanan = arr.length - 1;
  let langkah = 0;

  while (kiri <= kanan) {
    langkah++;
    const tengah = Math.floor((kiri + kanan) / 2);
    if (arr[tengah] === target) return { indeks: tengah, langkah };
    if (arr[tengah] < target) kiri = tengah + 1;
    else kanan = tengah - 1;
  }
  return { indeks: -1, langkah };
}

/**
 * Mengurutkan array angka secara naik menggunakan Bubble Sort (berhenti dini jika sudah urut).
 * @param {number[]} arr Array angka masukan
 * @returns {{ hasil: number[], perbandingan: number }} Array baru terurut dan jumlah perbandingan
 */
export function bubbleSort(arr) {
  const a = [...arr];
  let perbandingan = 0;

  for (let i = 0; i < a.length - 1; i++) {
    let swap = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      perbandingan++;
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swap = true;
      }
    }
    if (!swap) break;
  }
  return { hasil: a, perbandingan };
}

/**
 * Mengurutkan array angka secara naik menggunakan Selection Sort.
 * @param {number[]} arr Array angka masukan
 * @returns {{ hasil: number[], perbandingan: number }} Array baru terurut dan jumlah perbandingan
 */
export function selectionSort(arr) {
  const a = [...arr];
  let perbandingan = 0;

  for (let i = 0; i < a.length - 1; i++) {
    let iMin = i;
    for (let j = i + 1; j < a.length; j++) {
      perbandingan++;
      if (a[j] < a[iMin]) iMin = j;
    }
    if (iMin !== i) [a[i], a[iMin]] = [a[iMin], a[i]];
  }
  return { hasil: a, perbandingan };
}

/**
 * Mengurutkan array angka secara naik menggunakan Insertion Sort.
 * @param {number[]} arr Array angka masukan
 * @returns {{ hasil: number[], perbandingan: number }} Array baru terurut dan jumlah perbandingan
 */
export function insertionSort(arr) {
  const a = [...arr];
  let perbandingan = 0;

  for (let i = 1; i < a.length; i++) {
    const kunci = a[i];
    let j = i - 1;
    while (j >= 0) {
      perbandingan++;
      if (a[j] <= kunci) break;
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = kunci;
  }
  return { hasil: a, perbandingan };
}

/**
 * Mengurutkan daftar objek berdasarkan properti tertentu tanpa mengubah array asal.
 * @param {Object[]} daftar Array objek masukan
 * @param {string} properti Nama kolom pembanding
 * @param {"asc" | "desc"} [arah="asc"] Arah urutan ("asc" naik, "desc" turun)
 * @returns {Object[]} Array objek baru yang terurut
 */
export function urutkanBerdasarkan(daftar, properti, arah = "asc") {
  return [...daftar].sort((a, b) => {
    if (a[properti] === b[properti]) return 0;
    if (arah === "asc") return a[properti] > b[properti] ? 1 : -1;
    return a[properti] < b[properti] ? 1 : -1;
  });
}
