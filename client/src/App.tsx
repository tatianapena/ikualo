import { Route, Routes } from "react-router-dom";

import { GlobalProvider } from "./context/globalContext";
import { Login, Transaction } from "./pages";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Transaction />} path="/transaction" />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
