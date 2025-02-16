import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <a href="http://localhost:3000/api/auth/google" className="button">
        Sign in with Google
      </a>
    </>
  );
}

export default App;
