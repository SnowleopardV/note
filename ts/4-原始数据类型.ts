// boolean、number、string、null、undefined、void、Symbol、BigInt
const flag: boolean = true
const num: number = 100
const name1: string = 'jack'
const empty: null = null
const unusable: undefined = undefined

// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
function alertName(name): void {
  console.log(name)
}
