import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front";
import AuthForm from "./components/AuthForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/front" element={<Front />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
