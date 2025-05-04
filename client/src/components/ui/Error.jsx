import styles from './Error.module.css'

const Error = ({
    message = '',
    style = styles.error
}) => {
    return (
        <>
            {message != '' ? (
                <h4 className={style}>
                    [ERROR] {message}
                </h4>
            ) :
                <></>    
            }
        </>
    )
}

export default Error;