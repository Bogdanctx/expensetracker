import { useState, useEffect } from 'react';
import axios from 'axios';
import Account from './Account';


function App() {
    const [accounts, setAccounts] = useState([]);

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
            {accounts.map((account) => (
                <Account key = {account.id} account={account} />
            ))}
        </div>
      );
}

export default App;