import { useState } from 'react';
import axios from 'axios';
import styles from './NewAccount.module.css';
import InputField from '../ui/InputField';
import Error from '../ui/Error';
import Button from '../ui/Button';

const NewAccount = ({ setDisplayNewAccountCard }) => {
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setBalance(value);
        }
    };

    const handleCreate = async () => {
        if(!accountName) {
            setErrorMessage('Please enter the account\'s name.');
            return;
        }
        else {
            if(accountName == 'None') {
                setErrorMessage('Account name unavailable.');
                return;
            }
        }
        if(!balance) {
            setErrorMessage('Please enter the account\'s balance.');
            return;
        }

        const newAccount = {
            name: accountName,
            balance: parseFloat(balance),
            initialBalance: parseFloat(balance),
            created: new Date().toISOString()
        };

        try {
            await axios.post('http://localhost:8080/api/accounts/create', newAccount);
            setDisplayNewAccountCard(false);

            window.location.reload();
        } catch (error) {
            if(error.response) {
                setErrorMessage(error.response.data.toUpperCase());
            }
            else {
                setErrorMessage("UNKNOWN ERROR");        
            }
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className={`${styles.newaccount_card}`}>
            <div className={`justify-content-between ${styles.account_inputs}`}>
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}>
                    <InputField value={accountName} isRequired={true} labelTitle={"Account name"} setter={(e) => setAccountName(e.target.value)} placeholder={"Enter account name"} />
                </h5>

                <p className={`${styles.card_text}`} style={{ color: "#93C5FD" }}>
                    <InputField value={balance} isRequired={true} labelTitle={"Balance"} setter={handleBalanceChange} placeholder={"Enter account balance"} />
                </p>
            </div>

            <div className={`${styles.new_account_buttons}`}>
                <Button style={`btn btn-success ${styles.account_handle_button}`} text={'Create'} onClick={handleCreate} />
                <Button style={`btn btn-danger ${styles.account_handle_button}`} text={'Cancel'} onClick={() => setDisplayNewAccountCard(false)} />
            </div>

            
            <Error message={errorMessage} style={styles.errorMessage} /> 
        </div>
    );
};

export default NewAccount;
