import React, { createContext, useCallback, useState } from "react";
import { Vibration } from "react-native";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  // Login
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)


  // Alert
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const onToggleSnackBar = () => setVisibleAlert(!visibleAlert);
  const setAlert = useCallback((msg, err = null) => {
    setAlertMsg(msg)
    onToggleSnackBar()
    if (err) {
      setAlertError(true)
    } else {
      setAlertError(false)
    }
  }, [])


  //Team
  const [team, setTeam] = useState(null);


  // Vibrate
  const vibrate = () =>
    Vibration.vibrate(Platform.OS === "android" ? 100 : [100]);


  // OBJETO GLOBAL
  const global = {
    visibleAlert,
    onToggleSnackBar,
    alertMsg,
    setAlertMsg,
    setAlert,
    vibrate,
    team,
    setTeam,
    user,
    setUser,
    token,
    setToken,
    alertError
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
}
