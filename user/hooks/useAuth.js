import { useContext } from "react";
import { Appcontex } from "../context/Appcontext";

export const useAuth = () => useContext(Appcontex);
