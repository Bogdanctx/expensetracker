import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css';
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