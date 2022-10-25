import React, { useContext } from 'react';
import { Snackbar } from 'react-native-paper';
import { GlobalContext } from '../../contexts/global';

const Alert = () => {
    const { onToggleSnackBar, visibleAlert, alertMsg } = useContext(GlobalContext)

    return (
        <Snackbar
            duration={5000}
            style={{ marginBottom: 60 }}
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