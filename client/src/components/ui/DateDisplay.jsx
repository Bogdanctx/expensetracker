const DateDisplay = ({ dateString }) => {
    var date = new Date(dateString);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    return (
        <span>
            <p style={{ color: "#9CA3AF", justifySelf: "baseline", marginTop: "20px" }}>
                <i className={`bi bi-calendar-plus`} /> {day} {month} {year}
            </p>
        </span>
    )
}


export default DateDisplay;