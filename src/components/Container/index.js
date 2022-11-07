import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { makeStyles } from "./style";

const Container = ({ children }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default Container;
