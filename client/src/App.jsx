import { useState, useEffect } from "react";
import { setToken, call } from "./services/api";

const App = () => {
  useEffect(() => {
    async function getResults() {
      const result = await call("post", "auth/login", {
        username: "username",
        password: "password",
      });

      console.log(result);
    }

    getResults();
  }, []);
  return <div>App</div>;
};

export default App;
