import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginThrower from "./views/auth/LoginThrower";
import ThrowerLayout from "./layouts/thrower";
import PickerLayout from "./layouts/picker";
import LoginPicker from "./views/auth/LoginPicker";
import RegisterThrower from "./views/auth/RegisterThrower";
import RegisterPicker from "./views/auth/RegisterPicker";
import AuthIndex from "./views/auth/AuthIndex";
import HomePage from "./views/homepage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={ <HomePage/>} />
        <Route path="/auth/" element={<AuthIndex />} />
        <Route path="/auth/picker" element={<LoginPicker />} />
        <Route path="/auth/picker/register" element={<RegisterPicker />} />
        <Route path="/auth/thrower" element={<LoginThrower />} />
        <Route path="/auth/thrower/register" element={<RegisterThrower />} />
        <Route path="/picker/*" element={<PickerLayout />} />
        <Route path="/thrower/*" element={<ThrowerLayout />} />
        {/* <Route path="/" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
