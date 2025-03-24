import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 넥슨 Lv1 Gothic 웹 폰트 */
  @font-face {
    font-family: 'NexonLv1Gothic';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NexonLv1Gothic/NexonLv1GothicLight.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/NexonLv1Gothic/NexonLv1GothicLight.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'NexonLv1Gothic';
    font-weight: 400;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NexonLv1Gothic/NexonLv1GothicRegular.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/NexonLv1Gothic/NexonLv1GothicRegular.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'NexonLv1Gothic';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NexonLv1Gothic/NexonLv1GothicBold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/NexonLv1Gothic/NexonLv1GothicBold.woff') format('woff');
    font-display: swap;
  }

  /* 기본 스타일 초기화 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body,
  button,
  input,
  select,
  table,
  textarea {
    color: #000;
    font-family: 'NexonLv1Gothic', 'AppleSDGothicNeo-Regular', 'Malgun Gothic', '맑은 고딕', dotum, 돋움;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  ul, ol, li {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  em, address {
    font-style: normal;
  }

  img {
    width: 100%;
    vertical-align: top;
    border: 0;
  }

  .nexon {
    font-family: 'NexonLv1Gothic';
    font-weight: 400;
  }
`;

export default GlobalStyle;
