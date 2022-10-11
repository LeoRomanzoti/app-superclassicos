import { StyleSheet } from "react-native";


const makeStyles = (colors) => StyleSheet.create({
    deleteButton: {
        backgroundColor: colors.error,
        marginTop: 4,
        marginBottom: 4,
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    teamName: {
        textAlign: "center"
    },
    teamScore: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flatBottom: { paddingBottom: 30 }

});

export default makeStyles;