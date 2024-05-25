import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Coba from "./Coba";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/coba" element={<Coba />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
