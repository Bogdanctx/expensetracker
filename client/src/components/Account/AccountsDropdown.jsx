import styles from './AccountsDropdown.module.css';

const AccountsDropdown = ({ 
    onChange, 
    options, 
    defaultOption = ''
}) => {
    return (
        <div>
            <h3 className={styles.dropdownLabel}>Choose an account</h3>
            <select className={`form-select`} 
                    style={{backgroundColor: "var(--primary-500)", color: "var(--text-100)", border: "none"}} 
                    aria-label='Select an account'
                    onChange={onChange}
            >
                {defaultOption != '' && (
                    <option> {defaultOption} </option>
                )}
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default AccountsDropdown;