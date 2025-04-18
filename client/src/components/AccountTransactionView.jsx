import { useState } from "react";
import axios from "axios";
import styles from './AccountTransactionView.module.css'

const AccountTransactionView = ({ transaction }) => {
    return (
        <div className={`${styles.transaction_card}`}>
            <table className={`${styles.table}`}>
                <tr className={`${styles.tr}`}>
                    <td className="td"><i className={`bi bi-caret-right-fill`} /></td>
                    <td className="td">{transaction.title}</td>
                    <td className="td">{transaction.amount}</td>
                    {transaction.description.length > 0 && (
                        <td className="td">{transaction.description}</td>
                    )}
                </tr>
            </table>
        </div>
    );
};

export default AccountTransactionView;
