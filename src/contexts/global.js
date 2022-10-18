import React, { createContext, useState } from "react";
import { Vibration } from "react-native";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  // Alert
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const onToggleSnackBar = () => setVisibleAlert(!visibleAlert);

  // Global
  const userId = "78913335-ce10-4ffa-8e52-31898f7cfbcb";
  const teamId = "7266cae2-c205-4fe0-a7f2-6e2a3d16c174";

  //Team
  const [team, setTeam] = useState(null)

  // Vibrate
  const vibrate = () =>
    Vibration.vibrate(Platform.OS === "android" ? 100 : [100]);

  // OBJETO GLOBAL
  const global = {
    userId,
    teamId,
    visibleAlert,
    onToggleSnackBar,
    alertMsg,
    setAlertMsg,
    vibrate,
    team,
    setTeam
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
}
