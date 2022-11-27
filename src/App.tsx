import { ThemeProvider } from 'styled-components'
import { Router } from './components/Router'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CycleContexts'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  )
}
