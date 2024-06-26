import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Assets/Styles/buttonmeny.css';
import menu_logo from '../Assets/Icons/menu_logo.svg'
import dashboard_icon from '../Assets/Icons/dashboard_icon.svg'
import library_icon from '../Assets/Icons/library_icon.svg'
import social_icon from '../Assets/Icons/social_icon.svg'
import teams_icon from '../Assets/Icons/teams_icon.svg'
import projects_icon from '../Assets/Icons/projects_icon.svg'
import account_icon from '../Assets/Icons/account_icon.svg'


function Sidebar({ isOpen }) {
    const [activeItem, setActiveItem] = useState('dashboard');
    const navigate = useNavigate();

    const menuItems = [
        { name: 'dashboard', text: 'Dashboard', icon: dashboard_icon, path: '/dashboard' },
        { name: 'library', text: 'Library', icon: library_icon, path: '/library' },
        { name: 'planner', text: 'Planner', icon: library_icon, path: '/planner' },
        { name: 'social', text: 'Social', icon: social_icon, path: '/social' },
        { name: 'teams', text: 'Teams', icon: teams_icon, path: '/teams' },
        { name: 'projects', text: 'Projects', icon: projects_icon, path: '/projects' },
        { name: 'account', text: 'Account', icon: account_icon, path: '/account' },

    ];

    const sidebarClass = isOpen ? "sidebar open" : "sidebar closed";

    return (
        <div className={sidebarClass} style={{width: '200px'}}>
            <div className="logo">
                <img src={menu_logo} alt="Menu Logo" />
            </div>

            {menuItems.map(item => (
                <div
                    key={item.name}
                    className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
                    onClick={() => {
                        setActiveItem(item.name);
                        navigate(item.path)
                    }}
                >
                    <div className="menu-icon">
                        {<img src={item.icon} alt={`${item.text} icon`} />}
                    </div>
                    <div className="menu-text">{item.text}</div>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;