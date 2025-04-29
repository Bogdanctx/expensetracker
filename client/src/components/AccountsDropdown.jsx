const AccountsDropdown = ({ 
    onChange, 
    options, 
    defaultOption 
}) => {
    return (
        <select className="form-select" 
                style={{backgroundColor: "var(--primary-500)", color: "var(--text-100)", border: "none"}} 
                aria-label='Select an account'
                onChange={onChange}
        >
            <option> {defaultOption} </option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

export default AccountsDropdown;