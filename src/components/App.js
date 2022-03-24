import { Container } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import '../css/style.css'
import { NodeProvider } from "../context/NodeContext";

function App() {
  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center container">
        <div className="w-100 signup-container">
          <Router>
            <AuthProvider>
              <NodeProvider>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Login></Login>
                    }
                  />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </NodeProvider>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}



export default App;
