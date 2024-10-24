import { useEffect } from 'react'

import './App.css'
import Canvas from './canvas'
import Technology from "./components/Technology/Technology"
import Header from './components/Header/Header'


function App() {
  useEffect(() => {
    Canvas.instance
  }, [])
  return (
    <>
      <Header />

      <canvas id="canvas"></canvas>
      <div className="main">
        <Technology />
      </div>
    </>
  )
}

export default App
