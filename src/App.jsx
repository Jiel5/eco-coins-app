import { Routes, Route, BrowserRouter } from "react-router-dom";
import Coba from "./Coba";
import AuthLayout from "./layouts/auth";
import ThrowerLayout from "./layouts/thrower";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/coba" element={<Coba />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        {/* <Route path="/picker/*" element={<AdminLayout />} /> */}
        <Route path="/thrower/*" element={<ThrowerLayout />} />
        {/* <Route path="/" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
