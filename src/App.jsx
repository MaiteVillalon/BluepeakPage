import Header from './components/Header/Header.jsx'
import VideoHero from './components/VideoHero/VideoHero.jsx'
import Services from './components/Services/Services.jsx'
import Portfolio from './components/Portfolio/Portfolio.jsx'
import Process from './components/Process/Process.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <VideoHero />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
