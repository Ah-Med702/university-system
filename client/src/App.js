import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import User from "./components/User";
import AddUser from "./components/AddUser";
import UserDetails from "./components/UserDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/admin/addUser" element={<AddUser />} />
                    <Route path="/userDetails/:id" element={<UserDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
