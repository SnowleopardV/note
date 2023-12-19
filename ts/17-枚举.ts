// 枚举使用enum来定义
// 1. 自定义赋值
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days.Sun, Days.Sun === 0)
console.log(Days.Sat, Days.Sat === 6)

// 2. 手动赋值
enum Days2 {
  Sun = 7,
  Mon = 1,
  Tue, // 2, 从1开始累加
  Wed, // 3
  Thu, // 4
  Fri, // 5
  Sat, // 6
}

console.log(Days2.Tue, Days2.Tue === 2)
