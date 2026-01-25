import { useState, useEffect } from "react";
import "./App.css";
import OnboardScreen from "./screens/onboard-screen";
import MainScreen from "./screens/main-screen";

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    // return cleanup function
    return () => clearTimeout(timer);
  }, []);

  return <>{showSplash ? <OnboardScreen /> : <MainScreen />}</>;
}

export default App;
