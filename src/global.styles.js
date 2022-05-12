import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
  font-family: 'Open Sans', sans-serif;
  padding: 20px 40px;

  @media screen and (max-width: 800px) {
    padding: 10px;
  }
}
::-webkit-scrollbar {
  display: none;
}

a {
  text-decoration: none;
  color: black;
}

* {
  box-sizing: border-box;
}
`
