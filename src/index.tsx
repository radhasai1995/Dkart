import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n/i18n";
import * as ComponentsLib from "@componentLib";

declare global {
  interface Window {
    OuterSnackbar: any;
    liveCartTransactionSocket: any;
    liveProcessPaymentSocket: any;
    PAX: any;
    heartLandPaxIntializeStatus: any;
    isHeartLandConnected: any;
    getPaxInitializeObject: any;
    stripeTerminalObject: any;
    StripeTerminal: any;
  }
}

const OuterSnackbar = () => {
  const SnackbarProps = ComponentsLib.useSnackbarState();
  if (window) {
    window.OuterSnackbar = SnackbarProps;
  }
  return <ComponentsLib.Snackbar {...SnackbarProps} />;
};
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
ReactDOM.render(<OuterSnackbar />, document.getElementById("custom-snackbar"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
