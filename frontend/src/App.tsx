import { Route, Routes } from 'react-router-dom'
import Tracking from './components/pages/Tracking'

function App() {
  return (
    <div className='w-full h-full bg-gray-shade-400 text-white'>
      <Routes>
        <Route path='/' element={<Tracking />} />
        <Route path='/tracking' element={<Tracking />} />
      </Routes>
    </div>
  )
}

export default App