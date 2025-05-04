import { useState, useEffect } from 'react';
import axios from 'axios';
import Account from './Account/Account';
import ExpandedAccount from './ExpandedAccount/ExpandedAccount';
import Sidebar from './Sidebar/Sidebar';
import NewAccount from './Account/NewAccount';
import styles from './App.module.css';
import Transaction from './Transaction/Transaction';
import NewTransaction from './Transaction/NewTransaction';
import NewGoal from './Goal/NewGoal';
import Goal from './Goal/Goal';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showNewAccountComponent, setShowNewAccountComponent] = useState(false);
    const [showNewTransactionComponent, setShowNewTransactionComponent] = useState(false);
    const [showNewGoalComponent, setShowNewGoalComponent] = useState(false);
    

    useEffect(() => {
        const fetchData = async (setter, link) => {
            try {
                const response = await axios.get(link);
                setter(response.data);
            } catch (err) {}
        }
        
        fetchData(setAccounts, "http://localhost:8080/api/accounts");
        fetchData(setTransactions, "http://localhost:8080/api/transactions");
        fetchData(setGoals, "http://localhost:8080/api/goals");
    }, []);

    const deleteItem = async (route, id) => {
        try {
            await axios.delete(`http://localhost:8080/api/${route}/delete/${id}`);

            switch(route) {
                case 'transactions': {
                    setTransactions(prev => prev.filter(item => item.id !== id));
                    break;  
                }
                case 'goals': {
                    setGoals(prev => prev.filter(item => item.id !== id));
                    break;  
                }
                case 'accounts': {
                    setAccounts(prev => prev.filter(item => item.id !== id));
                    break;      
                }
            }
        
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <Sidebar setShowNewAccountComponent={setShowNewAccountComponent} setShowNewTransactionComponent={setShowNewTransactionComponent} setShowNewGoalComponent={setShowNewGoalComponent} />

            <div className={`${styles.content}`} id="content">
                <div className={`${styles.first_half}`} id="first_half">
                    <h1 className={`${styles.box_title}`} >TRANSACTIONS</h1>
                    <br />
                    <div className={`${styles.inner_box_first_half}`} id='inner_box_first_half'>
                        {showNewTransactionComponent && (
                            <NewTransaction setShowNewTransactionComponent={setShowNewTransactionComponent} accounts={accounts} />
                        )}

                        {transactions.map((transaction) => (
                            <Transaction key = {transaction.id} transaction={transaction} deleteTransaction={deleteItem} />
                        ))}
                    </div>
                </div>

                <div className={`${styles.second_half}`} id='second_half'>
                    <div className={`${styles.upper_box}`} id='upper_box' style={{opacity: selectedAccount ? "0.4" : "1"}}>
                        <h1 className={`${styles.box_title}`} >ACCOUNTS</h1>
                        <div className={`${styles.inner_upper_box}`} id="inner_upper_box">
                            {showNewAccountComponent && (
                                <NewAccount setShowNewAccountComponent={setShowNewAccountComponent} />
                            )}

                            {accounts.map((account) => (
                                <Account key={account.id} account={account} setSelectedAccount={setSelectedAccount} 
                                        transactions={transactions.filter((transaction) => transaction.account && transaction.account.id == account.id)}
                                        deleteAccount={deleteItem} />
                            ))}
                        </div>
                    </div>
                    
                    <div id='lower_box' className={`${styles.lower_box}`}>
                        <h1 className={`${styles.box_title}`} >GOALS</h1>
                        <div class={`${styles.inner_lower_box}`} >
                            {showNewGoalComponent && (
                                <NewGoal setShowNewGoalComponent={setShowNewGoalComponent} accounts={accounts} />
                            )}
                            {goals.map((goal) => (
                                <Goal key={goal.id} accounts={accounts} goal={goal} deleteGoal={deleteItem} />
                            ))}
                        </div>
                    </div>
                </div>
                
                    {selectedAccount && (
                        <ExpandedAccount account={selectedAccount} accounts={accounts} setSelectedAccount={setSelectedAccount} 
                                                transactions={transactions.filter((transaction) => transaction.account && transaction.account.id == selectedAccount.id)}
                                                onDelete={deleteItem} goals={goals.filter((goal) => goal.attachedAccount.id == selectedAccount.id)} />
                    )}
            </div>
        </div>
      );
}

export default App;