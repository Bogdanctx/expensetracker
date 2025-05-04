import { useState } from 'react';
import axios from 'axios';
import styles from './NewTransaction.module.css';
import transaction_styles from './Transaction.module.css';
import account_styles from './NewAccount.module.css';
import InputField from './InputField';
import AccountsDropdown from './AccountsDropdown';
import Error from './Error';
import Button from './Button';

const NewAccount = ({ setDisplayNewTransactionCard, accounts }) => {
    const [transactionTitle, setTransactionTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('None');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleCreate = async () => {
        if(!transactionTitle) {
            setErrorMessage('Please enter the title for this transaction.');
            return;
        }
        if (!amount) {
            setErrorMessage('Please enter the amount of this transaction.');
            return;
        }

        const acc = accounts.find((account) => account.id == selectedAccount);

        const newTransaction = {
            title: transactionTitle,
            amount: parseFloat(amount),
            description: description,
            added: new Date().toISOString(),
            account: acc
        };

        try {
            await axios.post('http://localhost:8080/api/transactions/create', newTransaction);
            setDisplayNewTransactionCard(false);

            window.location.reload();
        } catch (error) {
            if(error.response) {
                setErrorMessage(error.response.data.toUpperCase());
            }
            else {
                setErrorMessage("UNKNOWN ERROR");        
            }
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className={`${transaction_styles.transaction_card} ${styles.card}`} >
            <div className={`justify-content-between`}>
                <InputField isRequired={true} labelTitle={"Title"} placeholder={"Enter a title"} setter={(e) => setTransactionTitle(e.target.value)} value={transactionTitle} />
                <InputField isRequired={false} labelTitle={"Description"} placeholder={"Enter a description"} setter={(e) => setDescription(e.target.value)} value={description} />
                <InputField isRequired={true} labelTitle={"Amount"} placeholder={"Enter the amount of money spent"} setter={(e) => handleAmountChange(e)} value={amount} />
                
                <div style={{ width: "100%", textAlign: "center", padding: "13px" }}>
                    <AccountsDropdown onChange={(e) => setSelectedAccount(e.target.value)} options={accounts} defaultOption={'None'} />
                </div>
            </div>

            <div className={`${account_styles.new_account_buttons} ${styles.new_transaction_buttons}`}>
                <Button style={`btn btn-success`} text={'Create'} onClick={handleCreate} />
                <br />
                <Button style={`btn btn-danger`} text={'Cancel'} onClick={() => setDisplayNewTransactionCard(false)} />
            </div>

            <Error message={errorMessage} style={styles.errorMessage} />
        </div>
    )
};

export default NewAccount;
