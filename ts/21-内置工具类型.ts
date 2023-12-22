import { extract } from 'query-string/base'

interface User {
  name: string
  age: number
}

// 1. Partial<T>
type PartialUser = Partial<User>
const user: User = {
  // name: 'lilei',
  // age: 20
}

const use2: PartialUser = {}

// 2. Required<T>

interface Person {
  name?: string
  age?: number
}

type RequiredPerson = Required<Person>

const person: Person = {}
const pequiredPerson: RequiredPerson = {}

// 3. Readonly<T>

interface Student {
  name: string
  age: number
}

type ReadonlyStudent = Readonly<Student>

const student = {
  name: 'lilie',
  age: 20,
}

const readonlyStudent: ReadonlyStudent = {
  name: 'lilei',
  age: 20,
}

student.name = 'jack'
readonlyStudent.name = 'jack'

// 4. Pick<T, K>
interface Driver {
  name: string
  age: number
  sex: string
}

type PickDriver = Pick<Driver, 'name' | 'age'>

const driver: Driver = {
  name: 'lilei',
  age: 20,
}

const pickDriver: PickDriver = {
  name: 'lilei',
  age: 20,
}

// 5. Record<K, T>

// 6. Exclude<T, U>

type StringNumber = number | string
type ExcludeString = Exclude<StringNumber, string>

const excludeString: ExcludeString = 100

// 7. Extract<T, U>
type Colors = 'red' | 'blue' | 'green' | 'pink'
type Colors2 = 'green' | 'pink'
type ExtractColor = Extract<Colors, Colors2>

const color: ExtractColor = 'pink'
const color2: ExtractColor = 'yellow'

// 8. NonNullable<T>
type Nullable = string | null | undefined
type NoNullUndefined = NonNullable<Nullable>

const noNullUndefined: NoNullUndefined = 'lilei'
const noNullUndefined2: NoNullUndefined = null

// 9. ReturnType<T>

// 10. Parameters<T>

// 11. Omit<T, K>
interface Official {
  name: string
  age: number
  sex: string
}

type OmitOfficial = Omit<Official, 'sex'>
const official: Official = {
  name: 'lilie',
  age: 20,
}
const omitOfficial: OmitOfficial = {
  name: 'lilie',
  age: 20,
}

// 12. Assertion<T>

// 13. ThisParameterType<T>
