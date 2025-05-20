import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Bills from "./pages/Bills"
import BillDetail from "./pages/BillDetail"
import Representatives from "./pages/Representatives"
import RepresentativeDetail from "./pages/RepresentativeDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="bills" element={<Bills />} />
        <Route path="bills/:id" element={<BillDetail />} />
        <Route path="representatives" element={<Representatives />} />
        <Route path="representatives/:id" element={<RepresentativeDetail />} />
      </Route>
    </Routes>
  )
}

export default App
