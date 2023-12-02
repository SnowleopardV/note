const arr = [
    5, 3, 2, 6, 7, 4, 1, 8, 9, 0,
    15, 13, 12, 16, 17, 14, 11, 18, 19, 10,
    25, 23, 22, 26, 27, 24, 21, 28, 29, 20,
    35, 33, 32, 36, 37, 34, 31, 38, 39, 30,
    45, 43, 42, 46, 47, 44, 41, 48, 49, 40,
    55, 53, 52, 56, 57, 54, 51, 58, 59, 50,
    65, 63, 62, 66, 67, 64, 61, 68, 69, 60,
    75, 73, 72, 76, 77, 74, 71, 78, 79, 70,
    85, 83, 82, 86, 87, 84, 81, 88, 89, 80,
    95, 93, 92, 96, 97, 94, 91, 98, 99, 90,
]

function sort (arr) {
    if (arr.length === 1) return arr
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1
        const current = arr[i]

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = current
    }
    return arr
}
console.time()
console.log(sort(arr))
console.timeEnd()