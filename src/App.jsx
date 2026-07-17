import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ServicesPage from './pages/ServicesPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<ServicesPage />} />
    </Routes>
  )
}
