import { useContext } from "react";
import { AuthContext } from "../context/auth/authContext.jsx";

export const useAuth = () => useContext(AuthContext);