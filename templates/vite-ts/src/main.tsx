import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { LensConfig, staging } from "@lens-protocol/react";
import { localStorage } from "@lens-protocol/react/web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensProvider } from "@lens-protocol/react";

const { provider, webSocketProvider } = configureChains(
  [polygon, mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: localStorage(),
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <App />
      </LensProvider>
    </WagmiConfig>
  </React.StrictMode>
);
