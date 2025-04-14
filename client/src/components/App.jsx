import { useState, useEffect } from 'react';
import axios from 'axios';
import Account from './Account';
import ExpandedAccountView from './ExpandedAccountView';
import Sidebar from './Sidebar';
import NewAccount from './NewAccount';
import './App.css';
import Transaction from './Transaction';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [displayNewAccountCard, setDisplayNewAccountCard] = useState(false);

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
    

    return (
        <div style={{ display: "flex" }}>
            <Sidebar setDisplayNewAccountCard={setDisplayNewAccountCard} />
            <div id="content">
                <div id="first-half">
                    <div style={{opacity: selectedAccount ? "0.4" : "1"}}>
                        {displayNewAccountCard && (
                            <NewAccount setDisplayNewAccountCard={setDisplayNewAccountCard} />
                        )}
                        {accounts.map((account) => (
                            <Account key = {account.id} account={account} setSelectedAccount={setSelectedAccount} />
                        ))}
                    </div>
                </div>

                <div id="second-half">
                    <div id="upper-box">
                        {transactions.map((transaction) => (
                            <Transaction key = {transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </div>
                
                    {selectedAccount && (
                        <ExpandedAccountView account={selectedAccount} setSelectedAccount={setSelectedAccount} />
                    )}
            </div>
        </div>
      );
}

export default App;