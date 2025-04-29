import styles from './Button.module.css'

const Button = ({
    style = styles.default,
    text = '',
    type = 'button',
    icon = <></>,
    onClick
}) => {
    return (
        <button type={type} className={`${style}`} onClick={onClick} >
            {icon} {text}
        </button>
    )
}

export default Button;