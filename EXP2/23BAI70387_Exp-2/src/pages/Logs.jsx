import { useSelector, useDispatch } from "react-redux";
import { fetchLogs } from "../logsSlice";
import { useEffect } from "react";

const Logs = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.logs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLogs());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading Logs...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Daily Logs (Redux)</h3>
      <ul>
        {data.map((log) => (
          <li key={log.id}>
            {log.activity} — {log.carbon} kg CO₂
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
