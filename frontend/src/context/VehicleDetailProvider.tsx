// VehicleDetailContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { Vehicle } from '../components/atoms/VehicleItem'

interface VehicleDetailContextTypeContextType {
  vehicle: Vehicle
  setVehicle: (term: Vehicle) => void
}

// Create the context
const VehicleDetailContext = createContext<VehicleDetailContextTypeContextType | undefined>(undefined)

// Create a hook to use the VehicleDetailContext
export const useVehicle = () => {
  const context = useContext(VehicleDetailContext)
  if (!context) {
    throw new Error('useVehicle must be used within a VehicleDetailContextTypeProvider')
  }
  return context
}

// Create the provider
export const VehicleDetailContextTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  /** Declaring state for vehicle term */
  const [vehicle, setVehicleTerm] = useState({} as Vehicle)

  /** Set vehicle term */
  const setVehicle = (term: Vehicle) => setVehicleTerm(term)

  return (
    <VehicleDetailContext.Provider value={{ vehicle, setVehicle }}>
      {children}
    </VehicleDetailContext.Provider>
  )
}
