import { useState, useEffect } from 'react';
import axios from 'axios';
import Account from './Account';
import ExpandedAccountView from './ExpandedAccountView';
import Sidebar from './Sidebar';
import NewAccount from './NewAccount';
import './App.css';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [displayNewAccountCard, setDisplayNewAccountCard] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/accounts");
            setAccounts(response.data);
            
          } catch (err) {

        }
        };
    
        fetchAccounts();
      }, []);
    

    return (
        <div style={{ display: "flex" }}>
            <Sidebar setDisplayNewAccountCard={setDisplayNewAccountCard} />
            <div id="content">
                <div style={{opacity: selectedAccount ? "0.4" : "1"}}>
                    {displayNewAccountCard && (
                        <NewAccount setDisplayNewAccountCard={setDisplayNewAccountCard} />
                    )}
                    {accounts.map((account) => (
                        <Account key = {account.id} account={account} setSelectedAccount={setSelectedAccount} />
                    ))}
                </div>
                    {selectedAccount && (
                        <ExpandedAccountView account={selectedAccount} setSelectedAccount={setSelectedAccount} />
                    )}
            </div>
        </div>
      );
}

export default App;