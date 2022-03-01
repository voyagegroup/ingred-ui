import React, { VFC } from 'react'
import { ThemeProvider as IngredUiThemeProvider, createTheme } from 'ingred-ui'

type Props = {
  children: React.ReactNode
}

const ThemeProvider: VFC<Props> = (props) => {
  const { children } = props
  const theme = createTheme()
  return <IngredUiThemeProvider theme={theme}>{children}</IngredUiThemeProvider>
}

export default ThemeProvider
