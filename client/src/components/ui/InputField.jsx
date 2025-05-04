import styles from './InputField.module.css';

const InputField = ({ isRequired, labelTitle, placeholder, setter, value }) => {
    return (
        <span>
            <label className={`${styles.inputLabel}`}> {labelTitle} </label>
            <input type="text" className={`form-control ${styles.input}`} 
                    placeholder={placeholder}  
                    onChange={(e) => setter(e)}
                    required={isRequired}
                    value={value}
            />
        </span>
    )
}


export default InputField;