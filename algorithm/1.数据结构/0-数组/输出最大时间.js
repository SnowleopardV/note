const showLargestTime = (arr) => {
  let hour = 0
  let index1 = null
  let index2 = null
  let min = 0
  let index3 = null
  let index4 = null
  let second = 0
  let numberArr = [...arr]

  for (let i = 0; i < numberArr.length; i++) {
    for (let j = 0; j < numberArr.length; j++) {
      if (i === j) continue

      if (
        numberArr[i] * 10 + numberArr[j] < 24 &&
        numberArr[i] * 10 + numberArr[j] > hour
      ) {
        hour = numberArr[i] * 10 + numberArr[j]
        index1 = i
        index2 = j
      }
    }
  }

  if (index1 === null || index2 === null) {
    return 'invilid'
  }

  if (index1) {
    numberArr[index1] = null
  }

  if (index2) {
    numberArr[index2] = null
  }

  numberArr = numberArr.filter((item) => item !== null)

  for (let i = 0; i < numberArr.length; i++) {
    for (let j = 0; j < numberArr.length; j++) {
      if (i === j) continue

      if (
        numberArr[i] * 10 + numberArr[j] < 60 &&
        numberArr[i] * 10 + numberArr[j] > min
      ) {
        min = numberArr[i] * 10 + numberArr[j]
        index3 = i
        index4 = j
      }
    }
  }

  if (index3 === null || index4 === null) {
    return 'invilid'
  }

  if (index3) {
    numberArr[index3] = null
  }

  if (index4) {
    numberArr[index4] = null
  }

  numberArr = numberArr.filter((item) => item !== null)

  for (let i = 0; i < numberArr.length; i++) {
    for (let j = 0; j < numberArr.length; j++) {
      if (i === j) continue

      if (
        numberArr[i] * 10 + numberArr[j] < 60 &&
        numberArr[i] * 10 + numberArr[j] > second
      ) {
        second = numberArr[i] * 10 + numberArr[j]
        index5 = i
        index6 = j
      }
    }
  }
  console.log(73, numberArr)

  if (index5 === null || index6 === null) {
    return 'invilid'
  }

  if (index5) {
    numberArr[index5] = null
  }

  if (index6) {
    numberArr[index6] = null
  }

  numberArr = numberArr.filter((item) => item !== null)

  return `${hour}:${min}:${second}`
}

console.log(showLargestTime([2, 2, 7, 5, 5, 1]))
