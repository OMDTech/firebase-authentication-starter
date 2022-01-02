import { Container } from "react-bootstrap";
import styledComponents from "styled-components";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import UpdateProfile from "./UpdateProfile";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Wrapper>
      <Container className="d-flex align-items-center justify-content-center container">
        <div className="w-100 signup-container">
          <Router>
            <AuthProvider>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ForgetPassword />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styledComponents.div`
.container{
  min-height: 100vh

}

.signup-container{
  max-width:400px
}
`;

export default App;
