import React, { useState } from 'react';

function App() {
 const [token, setToken] = useState("");

 const login = async () => {
   const res = await fetch("http://localhost:8080/auth/login?username=raj", {method: "POST"});
   const data = await res.text();
   setToken(data);
 };

 const getPolls = async () => {
   const res = await fetch("http://localhost:8080/polls");
   const data = await res.text();
   alert(data);
 };

 return (
   <div>
     <h1>LivePoll System</h1>
     <button onClick={login}>Login</button>
     <button onClick={getPolls}>Get Polls</button>
     <p>{token}</p>
   </div>
 );
}

export default App;
