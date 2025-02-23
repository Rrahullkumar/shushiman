import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Menu from "./pages/Menu";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Auth type="login" />} />
                <Route path="/signup" element={<Auth type="signup" />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </Router>
    );
}

export default App;
