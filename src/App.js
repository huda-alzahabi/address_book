import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewContacts from "./pages/ViewContacts";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Contacts" element={<ViewContacts />}></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
