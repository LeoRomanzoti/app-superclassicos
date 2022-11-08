import React, { useCallback, useContext, useState } from "react";

import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";



import { useForm } from "react-hook-form";
import { Button, useTheme } from "react-native-paper";
import { GlobalContext } from "../../contexts/global";
import { storeGenericData, storeSingleData } from "../../contexts/storage";
import { handlerError } from "../../helpers/handlerError";
import api from "../../servers/api";
import { makeStyles } from "./styles";


export default function Home() {
  const { register, handleSubmit, setValue } = useForm();
  const { vibrate, setUser, user, setToken, setAlert } =
    useContext(GlobalContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [codeSent, setCodeSent] = useState(false);

  const handleLogin = useCallback(async (data) => {
    try {
      vibrate();
      const response = await api.post(`/login`, data);
      setUser(response.data);
      setCodeSent(true);
    } catch (error) {
      setAlert(handlerError(error), true)
      console.log(error);
    }
  }, []);

  const handleValidate = useCallback(
    async (data) => {
      try {
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
        setAlert(handlerError(error), true)
        console.log(error);
      }
    },
    [user]
  );

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View>
            <View style={styles.index}>
              <View style={styles.welcome}>
                <Text style={styles.title}>
                  Bem-vindo ao Cartola do SuperClássico.
                </Text>
                <Text style={styles.subTitle}>
                  Digite seu nome e seu número de telefone para receber o código e
                  ter acesso ao app para criar seu time.
                </Text>
              </View>
            </View>
            <View style={styles.middle}>
              <Image
                source={require("../../../assets/logo-superclassicos.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                keyboardType="name-phone-pad"
                textContentType="name"
                autoCapitalize="none"
                onChangeText={(text) => setValue("user_name", text)}
                {...register("user_name", { required: false })}
              />

              <TextInput
                style={styles.input}
                placeholder="Telefone"
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

              {codeSent && (
                <TextInput
                  style={styles.input}
                  placeholder="Código de acesso"
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={(text) => setValue("code", text)}
                  {...register("code", { required: true })}
                />
              )}

              {!codeSent ? (
                <Button
                  onPress={handleSubmit(handleLogin)}
                  style={styles.buttonCode}
                  mode="contained"
                >
                  <Text>Enviar Código</Text>
                </Button>
              ) : (
                <Button
                  onPress={handleSubmit(handleValidate)}
                  style={styles.button}
                  mode="contained"
                >
                  <Text>Entrar</Text>
                </Button>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
