import {createGlobalStyle} from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
}
html, body, #root {
    height: 100%;
}
:root {
    --grey: #edf0f5;
    --green: #dff5f0;
    --darkgreen: #00a489;
    --fontcolor: #4d958d;
    --hover: #d3d3d3;
}
`

export default GlobalStyle;
