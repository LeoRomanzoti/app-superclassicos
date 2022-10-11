import { NavigationContainer } from "@react-navigation/native";
import Alert from "./src/components/Alert";
import GlobalProvider from "./src/contexts/global";
import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <Routes />
        <Alert />
      </GlobalProvider>
    </NavigationContainer>
  );
}
