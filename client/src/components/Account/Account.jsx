import styles from './Account.module.css';
import DateDisplay from '../ui/DateDisplay';
import Button from '../ui/Button';

const Account = ({ account, setSelectedAccount, deleteAccount }) => {
    return (
        <div className={`${styles.card}`} >
            <div className="d-flex justify-content-between">
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}> 
                    {account.name}
                </h5>

                <div className={`d-flex`}>
                    <Button style={`btn p-2 d-flex align-items-center justify-content-center ${styles.card_button}`}
                            onClick={() => setSelectedAccount(account)}
                            icon={<i className="bi bi-arrows-fullscreen" />} />
                    
                    <Button style={`btn p-2 d-flex align-items-center justify-content-center ${styles.card_button}`}
                            onClick={() => deleteAccount('accounts', account.id)}
                            icon={<i className="bi bi-x-lg" />} />
                </div>
            </div>
            <p className={`card-text`} style={{ color: "#93C5FD" }}>
                <i className={`bi bi-piggy-bank-fill`} /> 
                <span style={{ color: "#10B981", marginLeft: "5px" }}>
                    ${account.balance}
                </span>
            </p>

            <DateDisplay dateString={account.created} />
        </div>
    )
}

export default Account;
