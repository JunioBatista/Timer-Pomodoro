import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App"> TESTE </div>
      <GlobalStyles />
    </ThemeProvider>
  )
}
