import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../store/logsSlice';

const Logs = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.logs);

    const handleFetchLogs = () => {
        dispatch(fetchLogs());
    };

    if (status === "loading") {
        return <p>Loading your logs...........</p>;
    }

    if (status === "failed") {
        return <p>Error: {error}</p>;
    }

    const logs = data || [];

    return (
        <div>
            {/* Fetch Button */}
            <div style={{ textAlign: "center", marginTop: 20 }}>
                <button
                    onClick={handleFetchLogs}
                    style={{
                        padding: "10px 20px",
                        borderRadius: 6,
                        backgroundColor: "#1db954",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                    disabled={status === "loading"}
                >
                    Fetch Logs
                </button>
            </div>

            {/* High Carbon */}
            <div style={{
                marginLeft: 'auto',
                backgroundColor: "#323232ff",
                marginRight: "auto",
                maxWidth: "30%",
                padding: 20,
                marginBottom: 10,
                marginTop: 10,
                borderRadius: 10,
                border: "2px solid red"
            }}>
                <h2>High Carbon Emission</h2>
                {logs
                    .filter(ele => ele.carbon >= 4)
                    .map((ele, index) => (
                        <h3 key={index} style={{ color: "red" }}>
                            {ele.activity} {ele.carbon}
                        </h3>
                    ))}
            </div>

            {/* Low Carbon */}
            <div style={{
                marginLeft: 'auto',
                backgroundColor: "#323232ff",
                marginRight: "auto",
                maxWidth: "30%",
                padding: 20,
                borderRadius: 10,
                border: "2px solid green"
            }}>
                <h2>Low Carbon Emission</h2>
                {logs
                    .filter(ele => ele.carbon < 4)
                    .map((ele, index) => (
                        <h3 key={index} style={{ color: "green" }}>
                            {ele.activity} {ele.carbon}
                        </h3>
                    ))}
            </div>
        </div>
    );
};

export default Logs;
