import { MdLock } from "react-icons/md";
import SignIn from "../views/auth/SignIn";

const authRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];

export default authRoutes;
