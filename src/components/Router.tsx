import { Routes, Route } from 'react-router-dom'
import { DeufaultLayout } from '../layouts/defaultLayout'
import { History } from '../pages/History'
import { Home } from '../pages/Home'

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
