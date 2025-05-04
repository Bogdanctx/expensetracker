import { useState } from 'react';
import axios from 'axios';
import styles from '../Account/NewAccount.module.css';
import goalStyles from './NewGoal.module.css';
import InputField from '../ui/InputField';
import Error from '../ui/Error';
import Button from '../ui/Button';
import AccountsDropdown from '../Account/AccountsDropdown';

const NewGoal = ({ accounts, setShowNewGoalComponent }) => {
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setTargetAmount(value);
        }
    };

    const handleCreate = async () => {
        if(!goalName) {
            setErrorMessage('Please enter a goal name');
            return;
        }
        if(!targetAmount) {
            setErrorMessage('Please enter the money target');
            return;
        }
        if(!description) {
            setErrorMessage('Please fill the goal\'s description');
            return;
        }

        const account = accounts.find(a => a.id == selectedAccountId);

        const newGoal = {
            title: goalName,
            amountTarget: parseFloat(targetAmount),
            description: description,
            attachedAccount: account
        };

        try {
            await axios.post('http://localhost:8080/api/goals/create', newGoal);
            setShowNewGoalComponent(false);

            window.location.reload();
        } catch (error) {
            setErrorMessage(error);
            
            console.error('Error creating goal:', error);
        }
    };

    return (
        <div className={`${styles.newaccount_card}`} style={{ width: "80%", height: "auto", padding: "15px", margin: "0 auto" }}>
            <div className={`justify-content-between ${styles.account_inputs}`}>
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}>
                    <InputField value={goalName} isRequired={true} labelTitle={"Goal name"} setter={(e) => setGoalName(e.target.value)} placeholder={"Enter goal name"} />
                </h5>

                <p className={`${styles.card_text}`} style={{ color: "#93C5FD" }}>
                    <InputField value={targetAmount} isRequired={true} labelTitle={"Target amount"} setter={handleAmountChange} placeholder={"Enter target amount"} />
                </p>

                <p className={`${styles.card_text}`}>
                    <InputField value={description} isRequired={true} labelTitle={"Description"} setter={(e) => setDescription(e.target.value)} placeholder={"What's the purpose of this goal?"} />
                </p>

                <div style={{ width: "100%", textAlign: "center", padding: "13px" }}>
                    <AccountsDropdown onChange={(e) => setSelectedAccountId(e.target.value)} options={accounts} defaultOption={''} />
                </div>
            </div>

            <div className={`${styles.new_account_buttons}`}>
                <Button style={`btn btn-success ${styles.account_handle_button}`} text={'Create'} onClick={handleCreate} />
                <Button style={`btn btn-danger ${styles.account_handle_button}`} text={'Cancel'} onClick={() => setShowNewGoalComponent(false)} />
            </div>

            <Error message={errorMessage} style={goalStyles.errorMessage} />
        </div>
    );
};

export default NewGoal;
