var data = [15, 9, 18, 7];
console.log(`data = ${data.join(' - ')}`);

var bs = function () {
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = 0; j < data.length - 1 - i; j++) {
            if (data[j] > data[j + 1]) {
                var temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
        console.log(`Proses ke-${i + 1} = ${data.join(' - ')}`);
    }
    console.log(`Hasil Pengurutan = ${data.join(' - ')}`)
}

bs();