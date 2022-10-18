import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider
} from "react-native-paper";
import Alert from "./src/components/Alert";
import GlobalProvider from "./src/contexts/global";
import Routes from "./src/routes";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#c8102e",
    secondary: "#b1b3b3",
    tertiary: "#13294b",
  },
  margins: {
    short: 10,
    medium: 15,
    large: 20,
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <PaperProvider theme={theme}>
          <Routes />
          <Alert />
        </PaperProvider>
      </GlobalProvider>
    </NavigationContainer>
  );
}
