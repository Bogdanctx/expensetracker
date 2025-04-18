import { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ setDisplayNewAccountCard, setDisplayNewTransactionCard }) => {
    return (
        <div className={`${styles.sidebar}`} id="sidebar">
            <h1 className={`${styles.sidebar_title}`} id="sidebar_title">EXPENSE <br /> TRACKER</h1>
            
            <button type="button" className={`${styles.sidebar_button}`} onClick={() => setDisplayNewAccountCard(true)}>
                <i className="bi bi-plus-square" style={{ float: "left" }}></i>
                Add account
            </button>
            <button type="button" className={`${styles.sidebar_button}`} onClick={() => setDisplayNewTransactionCard(true)}>
                <i className="bi bi-plus-square" style={{ float: "left" }}></i>
                Add transaction
            </button>
            <button type="button" className={`${styles.sidebar_button}`} onClick={() => setDisplayNewAccountCard(true)}>
                <i className="bi bi-plus-square" style={{ float: "left" }}></i>
                Add goal
            </button>
        </div>
      );
}

export default Sidebar;