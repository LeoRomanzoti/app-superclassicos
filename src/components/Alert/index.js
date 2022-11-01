import React, { useContext, useMemo } from 'react';
import { Snackbar, useTheme } from 'react-native-paper';
import { GlobalContext } from '../../contexts/global';

const Alert = () => {
    const { colors } = useTheme();
    const { onToggleSnackBar, visibleAlert, alertMsg, alertError } = useContext(GlobalContext)

    const styles = useMemo(() => {
        let style = {
            marginBottom: 60,
        }
        if (alertError) {
            style['backgroundColor'] = colors.error
        }
        return style
    }, [alertError])

    return (
        <Snackbar
            duration={5000}
            style={styles}
            visible={visibleAlert}
            onDismiss={onToggleSnackBar}
            action={{
                label: 'Fechar',
                onPress: () => onToggleSnackBar
            }}>
            {alertMsg}
        </Snackbar>
    );
};


export default Alert;