import { ELEMENT_TEXT } from './const'
const createElement = (type, config, ...children) => {
  delete config.__self
  delete config.__source

  return {
    type,
    props: {
      ...config,
      children: children.map((child) =>
        typeof child === 'object'
          ? child
          : {
              type: ELEMENT_TEXT,
              props: { children: [] },
            }
      ),
    },
  }
}

export default { createElement }
