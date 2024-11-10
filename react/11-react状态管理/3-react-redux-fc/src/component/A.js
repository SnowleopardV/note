import './A.css'
import { useDispatch } from 'react-redux'
import { increment } from '../redux/slice/topSlice'
function A() {
  const dispatch = useDispatch()
  const onScroll = (e) => {
    console.log(444, e.target.scrollTop)
    dispatch(increment(e.target.scrollTop))
  }
  return (
    <div className='A-wrap' onScroll={onScroll}>
      111111111
      <div className='A-body'></div>
    </div>
  )
}

export default A
