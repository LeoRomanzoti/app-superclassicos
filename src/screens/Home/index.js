import React, { useCallback, useContext, useState } from "react";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,

  TouchableWithoutFeedback,
  View
} from "react-native";

import { useForm } from "react-hook-form";
import { ActivityIndicator, Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { GlobalContext } from "../../contexts/global";
import { storeGenericData, storeSingleData } from "../../contexts/storage";
import { handlerError } from "../../helpers/handlerError";
import api from "../../servers/api";
import { makeStyles } from "./styles";

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { user_name: "", user_phone: "" } });
  const { vibrate, setUser, user, setToken, setAlert } =
    useContext(GlobalContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (data) => {
    try {
      setLoading(true)
      vibrate();
      const response = await api.post(`/login`, data);
      setUser(response.data);
      setCodeSent(true);
    } catch (error) {
      setAlert(handlerError(error), true);
      console.log(error);
    } finally {
      setLoading(false)
    }
  }, []);

  const handleValidate = useCallback(
    async (data) => {
      try {
        setLoading(true)
        vibrate();
        const payload = {
          user_id: user.id,
          code: data.code,
        };
        const response = await api.post(`/validation`, payload);
        storeSingleData("@token", response.data?.token);
        storeGenericData("@user", response.data?.user);
        setUser(response.data?.user);
        setToken(response.data.token);
      } catch (error) {
        setAlert(handlerError(error), true);
        console.log(error);
      } finally {
        setLoading(false)
      }
    },
    [user]
  );
  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.index}>
              <Image
                source={require("../../../assets/logo-superclassicos.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.inputView}>
              <View style={styles.bottom}>
                <TextInput
                  mode="flat"
                  name="firstName"
                  label="Nome"
                  style={styles.input}
                  keyboardType="name-phone-pad"
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(text) => setValue("user_name", text)}
                  {...register("user_name", { required: true })}
                />
                <HelperText style={styles.helper} type="error" visible={errors.user_name?.type === 'required'} role="alert">Necessário digitar seu nome.</HelperText >

                <TextInput
                  mode="flat"
                  label='Telefone'
                  style={styles.input}
                  placeholder="Ex: 19912345678"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  autoCapitalize="none"
                  onChangeText={(text) => setValue("user_phone", text)}
                  {...register("user_phone", {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                <HelperText style={styles.helper} type="error" visible={errors.user_phone?.type === 'required' || (getValues()?.user_phone?.length > 1 && getValues()?.user_phone?.length < 11)} role="alert">
                  Número deverá conter 11 digitos, DDD + n.º
                </HelperText>

                {codeSent && (
                  <TextInput
                    style={styles.input}
                    placeholder="Código de acesso"
                    keyboardType="numeric"
                    textContentType="oneTimeCode"
                    onChangeText={(text) => setValue("code", text)}
                    {...register("code", { required: codeSent ? true : false })}
                  />
                )}

                {!codeSent ? (
                  <Button
                    onPress={handleSubmit(handleLogin)}
                    buttonColor={colors.primary}
                    mode="contained"
                    loading={loading}
                    disabled={loading}
                  >
                    <Text>Enviar Código</Text>
                  </Button>
                ) : (
                  <Button
                    loading={loading}
                    disabled={loading}
                    icon='circle'
                    onPress={handleSubmit(handleValidate)}
                    buttonColor={colors.primary}
                    mode="contained"
                  >
                    <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    <Text>Entrar</Text>
                  </Button>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
