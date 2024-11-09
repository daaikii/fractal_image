import Header from './components/Header'
import About from "./components/About"
import News from './components/News'
import Technology from "./components/Technology"
import Testimonials from './components/Testimonials'
import Info from './components/Info'
import Footer from "./components/Footer"
import './App.css'



function App() {
  return (
    <>
      <Header />

      <div className="main">
        <About />
        <News />
        <Technology />
        <Testimonials />

        <Info />
      </div>

      <Footer />
    </>
  )
}

export default App
