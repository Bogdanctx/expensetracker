import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';

const Account = ({ account }) => {
    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    const deleteAccount = async() => {
        try {
            await axios.delete(`http://localhost:8080/api/accounts/delete/${account.id}`);

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div 
            className="card text-white" 
            style={{ 
                backgroundColor: "#1F2937", 
                width: "fit-content", 
                margin: "5px", 
                borderRadius: "10px" 
            }}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title" style={{ color: "#E0E7FF" }}> 
                        {account.name}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        style={{
                        backgroundColor: "#EF4444",
                        filter: "invert(1)"
                        }}
                        aria-label="Close"
                        onClick={deleteAccount}
                    ></button>
                </div>
                <p className="card-text" style={{ color: "#93C5FD" }}>
                    Balance: <span style={{ color: "#10B981" }}>${account.amount}</span>
                </p>
                <p className="card-text" style={{ color: "#9CA3AF" }}>
                    Created on: {day} {month} {year}
                </p>
            </div>
            </div>

    )
}

export default Account;
