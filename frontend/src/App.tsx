import { Route, Routes } from 'react-router-dom'
import Tracking from './components/pages/Tracking'
import VehicleManager from './components/pages/VehicleManager'
import VehicleAssign from './components/pages/VehicleAssign'

function App() {
  return (
    <div className='w-full h-full'>
      <Routes>
        <Route path='/' element={<Tracking />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/create' element={<VehicleManager />} />
        <Route path='/detail' element={<VehicleAssign />} />
      </Routes>
    </div>
  )
}

export default App