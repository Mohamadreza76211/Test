import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignUpForm from "./SignupAndSigninSection/SignUpSection/SignUpForm";
import SignInForm from "./SignupAndSigninSection/LogInSection/SignInForm";
import HomePage from "./Components/HomePage";
import MyProfile from "./Components/MyProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/HomePage" />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/SignInForm" element={<SignInForm />} />
          <Route path="/MyProfile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
