// DashboardPage.js
import React, { useState } from 'react';
import Sidebar from '../Components/ButtonMeny.js';
import Header from '../Components/DashboardHeader.js';

function DashboardPage() {
    const [isSidebarExpanded, setSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <div className="dashboard-page">
            <Header isExpanded={isSidebarExpanded} onToggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarExpanded} />
            {/* The rest of your page content */}
        </div>
    );
}

export default DashboardPage;
