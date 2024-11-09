import { useEffect } from "react"

import Canvas from "../canvas"
import { useCanvas, CanvasContextType } from "../store/CanvasProvider"



export default function About() {
  const { setCanvas } = useCanvas() as CanvasContextType
  useEffect(() => {
    const canvas = Canvas.instance
    setCanvas(canvas)
  }, [])
  return (
    <section className="about" id="about">
      <h2>「想いを形に、未来へ繋ぐクリエイティブ」</h2>
      <canvas id="canvas"></canvas>
    </section>
  )
}