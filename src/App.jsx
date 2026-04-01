import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./routes/Index";

function App() {
  return (  
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App;