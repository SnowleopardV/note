const { Circle } = window.G

function Ring(props) {
  console.log(4, props)
  const ring = new Circle({
    style: {
      cx: props.x,
      cy: props.y,
      r: 260,
      stroke: '#fff',
      lineWidth: 3,
      // fill: 'transparent',
    },
  })

  props.canvas.appendChild(ring)

  ring.addEventListener('click', () => {
    console.log(18)
    ring.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1.5)' },
      ],
      {
        duration: 1000,
        fill: 'forwards',
      }
    )
  })
  return ring
}

export default Ring
