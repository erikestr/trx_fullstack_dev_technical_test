import { Route, Routes } from 'react-router-dom'
import Tracking from './components/pages/Tracking'
import VehicleManager from './components/pages/VehicleManager'

function App() {
  return (
    <div className='w-full h-full bg-gray-shade-400 text-white'>
      <Routes>
        <Route path='/' element={<Tracking />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/create' element={<VehicleManager />} />
      </Routes>
    </div>
  )
}

export default App