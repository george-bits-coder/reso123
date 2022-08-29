import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { useState } from "react";
export default function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoggedin={setLoggedin} />}></Route>
        <Route
          path="/dashboard"
          element={<Dashboard loggedin={loggedin} />}
        ></Route>
      </Routes>
    </div>
  );
}
/*
[
{
  restaurant_id:1,
  restaurant_data:{

  }


},
{restaurant_id:2,
restaurant_data:{
  
}


}
]
*/
