import React, { createContext, useContext, useEffect, useState, useRef } from 'react'; 
import { useLocation } from 'react-router-dom';

export const LastLocationContext = createContext(null);

export const LastLocationProvider = ({ children }) => {
    // ⚡ HUME DO STATES MANAGEMENT MATRIX CHAHIYE:
    
    // 1. Database state jo consume hogi pure application me (pichla route)
    const [lastVisitedLocation, setLastVisitedLocation] = useState(null);
    
    // 2. Reference pointer context jo crash avoid karega aur check safe rakhega
    const location = useLocation(); 

    // 🛡️ advanced telemetry loop mapping
    useEffect(() => {
        // --- SAFE TRAP MECHANISM ---
        // window telemetry loop logic updates par current page capture kar legi
        const currentActivePath = location.pathname;

        // cleanup function context setup
        // Jab component badlega, yeh automatic cleanup loop trigger karega
        // cleanup state me hamesha pichla pathname loaded rehta hai
        return () => {
            // Humne pichle route ko trap kar liya aur state compile pipeline me drop kar diya
            console.log("Telemetry matrix trap initialized. Saving path:", currentActivePath);
            setLastVisitedLocation(currentActivePath);
        };
    }, [location]); // logic update sequence map integrated only on real route structure changes

    return (
        <LastLocationContext.Provider value={lastVisitedLocation}>
            {children}
        </LastLocationContext.Provider>
    );
};

