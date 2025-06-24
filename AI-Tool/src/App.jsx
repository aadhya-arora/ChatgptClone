import { HashRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front";
import AuthForm from "./components/AuthForm";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/front" element={<Front />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
