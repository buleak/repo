import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";

import App from "./App";
import { store } from "./stores";

import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "@/assets/index.css";
import "@unocss/reset/normalize.css";
import "uno.css";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
