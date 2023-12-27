/*
                A
        B1           B2
    C1     C2    C3      C4
D1 D2 D3

*/

const root = {
  key: 'A',
  children: [
    {
      key: 'B1',
      children: [
        {
          key: 'C1',
          children: [
            {
              key: 'D1',
              children: [],
            },
            {
              key: 'D2',
              children: [],
            },
            {
              key: 'D3',
              children: [],
            },
          ],
        },
        {
          key: 'C2',
          children: [],
        },
      ],
    },
    {
      key: 'B2',
      children: [
        { key: 'C3', children: [] },
        { key: 'C4', children: [] },
      ],
    },
  ],
}

// const doWork = (vdom) => console.log(vdom.key)

const walk = (vdom) => {
  // doWork(vdom)
  console.log(52, vdom.key)

  vdom.children.forEach((child) => walk(child))
}

walk(root)
