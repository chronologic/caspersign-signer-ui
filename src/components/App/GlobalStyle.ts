import { createGlobalStyle } from "styled-components";

import { skyblue } from "../colors";

const Style = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "proxima-nova",sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  .ant-layout {
    background: white;
  }
  .ant-layout-header {
    background: white;
    box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
    position: relative;
  }
  .ant-layout-footer {
    padding: 0 24px 12px;
    background: white;
    margin-bottom: 1rem;
  } 
  .ant-card-bordered {
    margin-bottom: 20px;
  }
  .tag-icon {
    width: 12px;
    margin-right: 5px;
  }
  .ant-card-meta-detail > div:not(:last-child) {
    margin-bottom: 0;
  }
  .share-buttons {
    margin-left: auto;
  }

  .ant-btn-primary:not([disabled]) {
    background: ${skyblue};
    border-color: ${skyblue};
  }


  /* Share icons */

  .resp-sharing-button__link,
  .resp-sharing-button__icon {
    display: inline-block
  }

  .resp-sharing-button__link {
    text-decoration: none;
    color: #fff;
    margin-left: 0.3em
  }

  .resp-sharing-button {
    transition: 25ms ease-out;
    padding: 0.25em 0.5em;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif
  }

  .resp-sharing-button__icon svg {
    width: 1em;
    height: 1em;
    margin-right: 0.4em;
    vertical-align: top
  }

  .resp-sharing-button--small svg {
    margin: 0;
    vertical-align: middle
  }

  .resp-sharing-button__icon--solid,
  .resp-sharing-button__icon--solidcircle {
    fill: #fff;
    stroke: none
  }

  .resp-sharing-button--facebook {
    background-color: #6e88c9;
    border-color: #6e88c9;
  }

  .resp-sharing-button--facebook:hover,
  .resp-sharing-button--facebook:active {
    background-color: #536697;
    border-color: #536697;
  }

  .resp-sharing-button--twitter {
    background-color: #60c3f1;
    border-color: #60c3f1;
  }

  .resp-sharing-button--twitter:hover,
  .resp-sharing-button--twitter:active {
    background-color: #4892b5;
    border-color: #4892b5;
  }

  .resp-sharing-button--linkedin {
    background-color: #569ad6;
    border-color: #569ad6;
  }

  .resp-sharing-button--linkedin:hover,
  .resp-sharing-button--linkedin:active {
    background-color: #4173a1;
    border-color: #4173a1;
  }

  .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
    color: ${skyblue};
  }

  .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: ${skyblue};
  }   

  .spinner {
    margin-top: 24px;
    text-align: center;
  }
`;

export default Style;
