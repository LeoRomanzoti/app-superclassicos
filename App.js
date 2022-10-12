import { NavigationContainer } from "@react-navigation/native";
import Alert from "./src/components/Alert";
import GlobalProvider from "./src/contexts/global";
import Routes from "./src/routes";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

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
