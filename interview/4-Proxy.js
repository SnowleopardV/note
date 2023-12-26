// Vue3 双向绑定原理 Proxy
const obj = {
  name: 'lilei',
  age: 20,
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(9, target, key, receiver, receiver === proxy, receiver === obj)

    return target[key]
  },

  set(target, key, value, receiver) {
    console.log(
      target,
      key,
      value,
      receiver,
      receiver === proxy,
      receiver === obj
    )
    target[key] = value
  },
})

Reflect.get(proxy, 'name')
Reflect.set(proxy, 'sex', 'female')
console.log(proxy, obj)

console.log(32, proxy.age)
proxy.age = 100
console.log(35, obj.age, proxy, typeof proxy)
