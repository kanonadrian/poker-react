import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material';
import { softnetTheme } from './softnet';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider  theme={ softnetTheme }>
      <CssBaseline/>
      { children }
    </ThemeProvider>
  )
}
