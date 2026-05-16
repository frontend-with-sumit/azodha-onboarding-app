import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { Provider } from "./components/ui/provider.tsx"
import { BrowserRouter } from "react-router"
import { Provider as RTKProvider } from "react-redux"
import { store } from "./store/index.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RTKProvider store={store}>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </RTKProvider>
  </StrictMode>,
)
