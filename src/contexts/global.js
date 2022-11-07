import React, { createContext, useCallback, useMemo, useState } from "react";
import { Vibration } from "react-native";
import { getGenericData } from "./storage";

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


  //Admin
  const isAdmin = useMemo(async () => {
    const user = await getGenericData('@user')
    let isAdmin = false;
    user?.scopes?.map((scope) => {
      if (scope === "admin") {
        isAdmin = true
      }
    })
    return isAdmin
  }, [user])


  //Team
  const [team, setTeam] = useState(null);


  // Vibrate
  const vibrate = () =>
    Vibration.vibrate(Platform.OS === "android" ? 100 : [100]);


  // OBJETO GLOBAL
  const global = {
    isAdmin,
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
