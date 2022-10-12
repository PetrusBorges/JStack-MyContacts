//Routes
import { Routes, Route } from 'react-router-dom'

//Pages
import Home from './pages/Home'
import NewContact from './pages/NewContact'
import EditContact from './pages/EditContact'

export default function ReactRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  )
}
