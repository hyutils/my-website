import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/routers";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { nextLocal } from "./nextLocals";

import intl from "react-intl-universal";
import locales from "./locales";
// i18n
//   .use(initReactI18next)
//   .init({
//     // 设置语言资源，可以根据需要引入其他语言文件
//     resources: {
//       en: {
//         translation: {
//           // 将所有需要国际化的文本放在这里
//           // 例如："hello": "Hello",
//           ...nextLocal.en
//         },
//       },
//       zh: {
//         translation: {
//           // 中文翻译
//           // 例如："hello": "你好",
//           ...nextLocal.zh
//         },
//       },
//     },
//     lng: 'zh', // 默认语言
//     fallbackLng: 'zh', // 如果当前语言没有对应的翻译，将使用该语言作为备用
//     interpolation: {
//       escapeValue: false, // 不要对翻译的文本进行转义，以支持 HTML 标签
//     },
//   });

const currentLocale = localStorage.getItem("language") || "zh"; // 默认语言
console.log("初始化", currentLocale);

intl.init({
  currentLocale,
  locales,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
