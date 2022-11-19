import { Routes, Route } from 'react-router-dom'
import { DeufaultLayout } from '../assets/DefaultLayout'
import { History } from '../pages/History'
import { Home } from '../pages/home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DeufaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
