import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once count is equal to 0
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <Loader />
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
}

export default LoadingToRedirect;
