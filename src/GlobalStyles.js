import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        scroll-behavior: smooth;
        background: #124075;;
        font-family: 'Roboto Mono', monospace;
        letter-spacing: 1px;
        line-height: 1.5;
        @media (max-width: 1450px){
            font-size: 90%;
        }
        @media (max-width: 750px){
            font-size: 80%;
        } 
    }
    body {
        font-family: 'Roboto Mono', monospace;
    }
    ul {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
    button, a, label, input, textarea {
        font-family: 'Roboto Mono', monospace;
        letter-spacing: 1px;
        padding: 2px;
        border-radius: 4px;
    }
    h1 {
        line-height: normal;
    }
    #delete {
        color: #ffffff;
        border: 2px solid red;
        background: none;
        &:hover {
            color: #ff0000;
            transform: scale(1.05);
            transition: 0.2s;
        }
    }
`;

export default GlobalStyles;