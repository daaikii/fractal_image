import { useState, createContext, PropsWithChildren, useContext, Dispatch, SetStateAction } from "react"
import Canvas from "../canvas"


export type CanvasContextType = {
  canvas: Canvas | null,
  setCanvas: Dispatch<SetStateAction<Canvas | null>>
}


export const CanvasContext = createContext<CanvasContextType | null>(null)

export function CanvasProvider({ children }: PropsWithChildren) {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  return (
    <CanvasContext.Provider value={{ canvas, setCanvas }} >
      {children}
    </CanvasContext.Provider>
  )
}

export function useCanvas() {
  return useContext(CanvasContext)
}