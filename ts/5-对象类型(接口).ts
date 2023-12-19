// 一、接口类型
interface Person {
  name: string
  age: number
}

const p: Person = {
  name: 'Tom',
  age: 20,
}

// 1. 定义的变量比接口少了一些属性会报错
const p2: Person = {
  name: 'lilei',
}

// 2. 定义的变量比接口定义的属性要多一些也会报错
const p3: Person = {
  name: 'jack',
  age: 100,
  sex: 'male',
}

// 二、可选属性
interface Student {
  name: string
  age?: number
}

const s: Student = {
  name: 'jack',
}

// 三、任意属性
// 1. 简单示例
interface Teacher {
  name: string
  age: number
  [propName: string]: any
}

const t: Teacher = {
  name: 'lilei',
  age: 10,
  sex: 'male',
}

// 2. 一旦定义了任意类型, 那么确认属性和可选属性的类型, 都必须是它类型的子集
interface Teacher2 {
  name: string
  age: number
  [propName: string]: string
}

// 四、只读属性
interface Teacher3 {
  readonly id: number
  name: string
  age: number
}

const t2: Teacher3 = {
  id: 1,
  name: 'lilei',
  age: 10,
}

t2.id = 2
