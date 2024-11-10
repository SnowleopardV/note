import { useSelector } from 'react-redux'
function B() {
  const top = useSelector((state) => state.counter.counter)
  return <div>2222---{top}</div>
}

export default B
