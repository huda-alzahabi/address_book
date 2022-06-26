import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewContacts from "./pages/ViewContacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import Map from "./components/Map";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Contacts" element={<ViewContacts />}></Route>
          <Route path="/AddContact" element={<AddContact />}></Route>
          <Route path="/EditContact" element={<EditContact />}></Route>
          <Route path="/Location" element={<Map />}></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
