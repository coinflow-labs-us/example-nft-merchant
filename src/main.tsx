import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "boxicons";
import {
  NftStoreConnectionService,
  SolanaNet,
} from "@phantasia/nft-store-interface";
import { PrivyProvider } from "@privy-io/react-auth";

NftStoreConnectionService.setNet(SolanaNet.DEVNET);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cltehkuq70chxmee356zvcp7e"
      config={{
        loginMethods: ["email", "google", "sms"],
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
