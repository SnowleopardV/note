const mergyList = (arr, arr2) => {
  let index = (index2 = 0)
	let result = []

  while (index < arr.length && index2 < arr2.length) {
    if (arr[index] < arr2[index2]) {
			result.push(arr[index])
			index++
    } else {
			result.push(arr2[index2])
			index2++
		}
  }

	if (index < arr.length) {
    while (index < arr.length) {
      result.push(arr1[index]);
      index++;
    }
  }

  if (index2 < arr2.length) {
    while (index2 < arr2.length) {
			console.log(27, index2, arr2.length)
      result.push(arr2[index2]);
      index2++;
    }
  }


	return result
}

const arr = [1, 4, 6, 8, 10, 13, 14, 15, 16, 17]
const arr2 = [2, 3, 5, 7, 9, 11, 12, 18]

console.log(mergyList(arr, arr2))
