import { useContext } from "react";
import { LastLocationContext } from "../context/lastLocation/lastLocationContext";


export const useLastLocation = () => {
    const lastLocation = useContext(LastLocationContext);
    return lastLocation;
}