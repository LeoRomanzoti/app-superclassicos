import React, { createContext, useState } from "react";
import { Vibration } from "react-native";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  // Alert
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const onToggleSnackBar = () => setVisibleAlert(!visibleAlert);

  // Global
  const userId = "5292db3f-49ed-4382-8386-73b1e51fc35f";
  const teamId = "132d8efd-717b-4407-a284-9f4288190700";

  //Team
  const [team, setTeam] = useState(null);

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
    setTeam,
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
}
