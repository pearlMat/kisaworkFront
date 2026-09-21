import React, { createContext, useContext } from 'react'

type Mode = 'light' | 'dark' | 'system'

interface GluestackUIContextType {
  mode: Mode
}

const GluestackUIContext = createContext<GluestackUIContextType>({ mode: 'light' })

export const useGluestackUI = () => useContext(GluestackUIContext)

interface GluestackUIProviderProps {
  mode?: Mode
  children?: React.ReactNode
}

export function GluestackUIProvider({ mode = 'light', children }: GluestackUIProviderProps) {
  return (
    <GluestackUIContext.Provider value={{ mode }}>
      <div className={mode === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </GluestackUIContext.Provider>
  )
}
