const BloomFilter = require("./2-bloom-filter");

let bloomFilter = new BloomFilter(50000000, 0.001);

bloomFilter.add("jhjhjhjkhkhkhjhj");
bloomFilter.add("jhjhjk");
console.log(bloomFilter.isExist("jhjhjhjkhkhkhjhj"));
console.log(bloomFilter.isExist("jhjhjhjkhkhkhjh"));
console.log(bloomFilter.isExist("jhjhjhjkhkhkhj"));
console.log(bloomFilter.isExist("jhjhjhjkhkhkh"));
console.log(bloomFilter.isExist("jhjhjhjkhkhk"));
console.log(bloomFilter.isExist("jhjhjhjkhkh"));
console.log(bloomFilter.isExist("jhjhjhjkhk"));
console.log(bloomFilter.isExist("jhjhjhjkh"));
console.log(bloomFilter.isExist("jhjhjhjk"));
console.log(bloomFilter.isExist("jhjhjk"));
