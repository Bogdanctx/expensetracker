import { useState, useEffect } from 'react';
import axios from 'axios';
import Account from './Account';
import ExpandedAccountView from './ExpandedAccountView';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);

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
        <div>
          <div style={{opacity: selectedAccount ? "0.4" : "1"}}>
            {accounts.map((account) => (
                <Account key = {account.id} account={account} setSelectedAccount={setSelectedAccount} />
            ))}
          </div>
            {selectedAccount && (
              <ExpandedAccountView account={selectedAccount} onClose={() => setSelectedAccount(null)} />
            )}
        </div>
      );
}

export default App;