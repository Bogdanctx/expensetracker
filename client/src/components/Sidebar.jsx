import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ setDisplayNewAccountCard }) => {
    return (
        <div id="sidebar">
            <h1 id="sidebar-title">EXPENSE <br /> TRACKER</h1>
            
            <button type="button" className='sidebar-button' onClick={() => setDisplayNewAccountCard(true)}>
                <i className="bi bi-plus-square" style={{ float: "left" }}></i>
                Add account
            </button>
        </div>
      );
}

export default Sidebar;