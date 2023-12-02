function hasSame (str) {
    const tmpStr = str
    for (let i = 0; i < tmpStr.length; i++) {
        const tmp = tmpStr[i]
        const index = str.indexOf(tmp)
        str = str.slice(0, index) + str.slice(index+1, str.length)
        if (str.includes(tmp)) return true
    }
    return false
}

function sonString (str) {
    let result = ''
    for (let i = 0; i < str.length; i ++) {
        for (let j = 1; j < str.length; j++) {
            const current = str.slice(i, j)
            if(!hasSame(current) && current.length > result.length) {
                result = current
            } else if (hasSame(current)) {
                continue
            }
        }
    }
    return result
}
console.log(sonString('pwwkew'))