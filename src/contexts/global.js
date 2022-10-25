import React, { createContext, useMemo, useState } from "react";
import { Vibration } from "react-native";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  // Login
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Alert
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const onToggleSnackBar = () => setVisibleAlert(!visibleAlert);

  //Admin
  const isAdmin = () => useMemo(() => {
    let isAdmin = false;

    user?.scopes.map((scope) => {
      if (scope === "admin") {
        isAdmin = true
      }

    })
    return isAdmin
  }, [user])

  //Auth
  const authHeader = () => useMemo(() => {
    const header = { "Authorization": `Bearer ${token}` };
    return header
  }, [token])

  //Team
  const [team, setTeam] = useState(null);

  // Vibrate
  const vibrate = () =>
    Vibration.vibrate(Platform.OS === "android" ? 100 : [100]);

  // OBJETO GLOBAL
  const global = {
    isLogged,
    isAdmin,
    visibleAlert,
    onToggleSnackBar,
    alertMsg,
    setAlertMsg,
    vibrate,
    team,
    setTeam,
    user,
    setUser,
    setIsLogged,
    token,
    setToken,
    authHeader
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
}
