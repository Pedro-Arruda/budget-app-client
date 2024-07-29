import { AuthContextProvider } from "./contexts/PlugglyContext";
import { Router } from "./routes";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
