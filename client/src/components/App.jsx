import { useState, useEffect } from 'react';
import axios from 'axios';
import Account from './Account';
import ExpandedAccountView from './ExpandedAccountView';
import Sidebar from './Sidebar';
import NewAccount from './NewAccount';
import styles from './App.module.css';
import Transaction from './Transaction';
import NewTransaction from './NewTransaction';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [displayNewAccountCard, setDisplayNewAccountCard] = useState(false);
    const [displayNewTransactionCard, setDisplayNewTransactionCard] = useState(false);

    useEffect(() => {
        const fetchData = async (setter, link) => {
            try {
                const response = await axios.get(link);
                setter(response.data);
            } catch (err) {}
        }
        
        fetchData(setAccounts, "http://localhost:8080/api/accounts");
        fetchData(setTransactions, "http://localhost:8080/api/transactions");
    }, []);

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/transactions/delete/${id}`);
        } catch (error) {
            console.error(error);
        }

        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const deleteAccount = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/accounts/delete/${id}`);
        } catch (error) {
            console.error(error);
        }

        setAccounts(prev => prev.filter(a => a.id !== id));
    }

    return (
        <div style={{ display: "flex" }}>
            <Sidebar setDisplayNewAccountCard={setDisplayNewAccountCard} setDisplayNewTransactionCard={setDisplayNewTransactionCard} />
            <div className={`${styles.content}`} id="content">
                <div className={`${styles.first_half}`} id="first_half">
                    <h1 className={`${styles.box_title}`} >TRANSACTIONS</h1>
                    <br />
                    <div className={`${styles.inner_box_first_half}`} id='inner_box_first_half'>
                        {displayNewTransactionCard && (
                            <NewTransaction setDisplayNewTransactionCard={setDisplayNewTransactionCard} accounts={accounts} />
                        )}

                        {transactions.map((transaction) => (
                            <Transaction key = {transaction.id} transaction={transaction} onDelete={deleteTransaction} />
                        ))}
                    </div>
                </div>

                <div className={`${styles.second_half}`} id='second_half'>
                    <div className={`${styles.upper_box}`} id='upper_box' style={{opacity: selectedAccount ? "0.4" : "1"}}>
                        <h1 className={`${styles.box_title}`} >ACCOUNTS</h1>
                        <div className={`${styles.inner_upper_box}`} id="inner_upper_box">
                            {displayNewAccountCard && (
                                <NewAccount setDisplayNewAccountCard={setDisplayNewAccountCard} />
                            )}
                            {accounts.map((account) => (
                                <Account key={account.id} account={account} setSelectedAccount={setSelectedAccount} 
                                        transactions={transactions.filter((t) => t.account && t.account.id == account.id)}
                                        onDelete={deleteAccount} />
                            ))}
                        </div>
                    </div>
                    
                    <div id='lower_box' className={`${styles.lower_box}`}>
                        <h1 className={`${styles.box_title}`} >GOALS</h1>
                    </div>
                </div>
                
                    {selectedAccount && (
                        <ExpandedAccountView account={selectedAccount} setSelectedAccount={setSelectedAccount} 
                                                transactions={transactions.filter((t) => t.account && t.account.id == selectedAccount.id)}
                                                onDelete={deleteTransaction}
                        />
                    )}
            </div>
        </div>
      );
}

export default App;