// Vue3 双向绑定原理 Proxy
const obj = {
  name: 'lilei',
  age: 20,
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(target, key, receiver, receiver === proxy, receiver === obj)

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