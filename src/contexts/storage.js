import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeSingleData = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, value)
    } catch (e) {
        console.log(e)
    }
}


export const getSingleData = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name)
        if (!value) return null
        return value
    } catch (e) {
        // error reading value
    }
}


export const storeGenericData = async (name, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(name, jsonValue)
    } catch (e) {
        // saving error
    }
}


export const getGenericData = async (name) => {
    try {
        const jsonValue = await AsyncStorage.getItem(name)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
    }
}
