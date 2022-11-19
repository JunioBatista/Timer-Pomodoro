import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function DeufaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
