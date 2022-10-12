import React, { createContext, useState } from "react";
import { Vibration } from "react-native";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  // Alert
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const onToggleSnackBar = () => setVisibleAlert(!visibleAlert);

  // Global
  const userId = "35fe8001-a6d5-4d43-8fb5-cf1278c9211f";
  const teamId = "bd1a29c6-51b4-4e38-9834-928194652325";

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
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
}
