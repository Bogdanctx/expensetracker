import { useState } from 'react';
import axios from 'axios';
import styles from './NewAccount.module.css';
import InputField from './InputField';
import Error from './Error';
import Button from './Button';

const NewGoal = ({ accounts, setDisplayNewGoalCard }) => {
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setTargetAmount(value);
        }
    };

    const handleCreate = async () => {
        if (!goalName || !targetAmount || !selectedAccountId) {
            setErrorMessage('Please fill out all required fields.');
            return;
        }

        const newGoal = {
            title: goalName,
            amountTarget: parseFloat(targetAmount),
            description: description,
            attachedAccount: { id: selectedAccountId }
        };

        try {
            await axios.post('http://localhost:8080/api/goals/create', newGoal);
            setDisplayNewGoalCard(false);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                setErrorMessage(error);
            } else {
                setErrorMessage("UNKNOWN ERROR");
            }
            console.error('Error creating goal:', error);
        }
    };

    return (
        <div className={`${styles.newaccount_card}`} style={{ width: "80%", padding: "15px", margin: "0 auto" }}>
            <div className={`justify-content-between ${styles.account_inputs}`}>
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}>
                    <InputField value={goalName} isRequired={true} labelTitle={"Goal name"} setter={(e) => setGoalName(e.target.value)} placeholder={"Enter goal name"} />
                </h5>

                <p className={`${styles.card_text}`} style={{ color: "#93C5FD" }}>
                    <InputField value={targetAmount} isRequired={true} labelTitle={"Target amount"} setter={handleAmountChange} placeholder={"Enter target amount"} />
                </p>

                <p className={`${styles.card_text}`}>
                    <InputField value={description} isRequired={false} labelTitle={"Description"} setter={(e) => setDescription(e.target.value)} placeholder={"What’s the purpose of this goal?"} />
                </p>

                <p className={`${styles.card_text}`}>
                    <label style={{ color: "var(--text-50)", fontWeight: "bold" }}>Select Account:</label>
                    <select className="form-select" value={selectedAccountId} onChange={(e) => setSelectedAccountId(e.target.value)}>
                        <option value="">-- Choose an account --</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name} (${account.balance})
                            </option>
                        ))}
                    </select>
                </p>
            </div>

            <div className={`${styles.new_account_buttons}`}>
                <Button style={`btn btn-success ${styles.account_handle_button}`} text={'Create'} onClick={handleCreate} />
                <Button style={`btn btn-danger ${styles.account_handle_button}`} text={'Cancel'} onClick={() => setDisplayNewGoalCard(false)} />
            </div>

            <Error message={errorMessage} style={styles.errorMessage} />
        </div>
    );
};

export default NewGoal;
