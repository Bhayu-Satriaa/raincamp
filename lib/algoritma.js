//1. Linear Search - Telusuri Satu per Satu
export function linearSearch(arr, target) {
    let langkah = 0;

    for (let i = 0; i < arr.length; i++) {
        langkah++;
        if (arr[i] === target) return { indeks: i, langkah };
    }
    return { indeks: -1, langkah };
}

//2. Binary Search - Cut the Cake!
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

//3. Bubble Sort - Swap it if its greater or smaller 
export function bubbleSort(arr, target) {
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
    }
    return { hasil: a, perbandingan };
}

//4. Selection Sort - Search for the smallest & swap it to the front
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

// 5. Insertion Sort - Sisipkan elemen ke tempat yang tepat seperti kartu
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

// 6. Urutkan Berdasarkan Properti Objek (Fungsi Murni Reusable)
export function urutkanBerdasarkan(daftar, properti, arah = "asc") {
    return [...daftar].sort((a, b) => {
        if (arah === "asc") {
            return a[properti] > b[properti] ? 1 : -1;
        }
        return a[properti] < b[properti] ? 1 : -1;
    });
}