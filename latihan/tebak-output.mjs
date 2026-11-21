let a = 1; { let a = 2; }
console.log(a);

const { nama, umur = 17 } = { nama: "Ani" };
console.log(nama, umur);

const [x, , z] = [10, 20, 30];
console.log(x + z);


const arrA = [1, 2];
const b = [...arrA, 3];
arrA.push(9);
console.log(b);

const o = { p: 1 };
const q = { ...o, p: 2, r: 3 };
console.log(o.p, q.p, q.r);

console.log([5, 1, 10, 2].sort());

console.log([3, 8, 12, 5].find((n) => n > 6));

const f = (n) => { n * 2 };
console.log(f(3));

const u = { profil: { kota: "Palu" } };
console.log(u.alamat?.kota, u.profil?.kota);

console.log([..."abc"].map((c) => c.toUpperCase()).join("-"));

const nilai = [60, 85, 72, 90];
let jumlahLulus = 0;
for (const n of nilai) {
    if (n < 70) continue;
    jumlahLulus++;
}

console.log(jumlahLulus);
