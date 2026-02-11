import React, { useState } from "react";

const Sidebar = () => {
    const [activeButton, setActiveButton] = useState("Home");
    const handleLogout = () => {
        setActiveButton("Logout");
    };
    const handleProfile = () => {
        setActiveButton("profile");
    };
    const handleHome = () => {
        setActiveButton("Home");
    };
    return (
        <div className="sidebar">
            <ul style={{listStyle: 'none', marginTop: '20px', width: '100%'}}    >
                <button onClick={handleHome} className={activeButton === "Home" ? "active" : ""}>Home</button>
                <button onClick={handleProfile} className={activeButton === "profile" ? "active" : ""}>profile</button>
                <button onClick={handleLogout} className={activeButton === "Logout" ? "active" : ""}>Logout</button>
            </ul>
        </div>
    );
};

export default Sidebar; 