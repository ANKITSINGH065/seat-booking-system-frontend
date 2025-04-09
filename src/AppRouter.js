// AppRouter.js
import { Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

import SeatBookingPage from "./pages/SeatBookingPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <SeatBookingPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRouter;
