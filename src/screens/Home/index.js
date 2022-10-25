import React, { useCallback, useContext, useState } from "react";
import {
  KeyboardAvoidingView, Text,
  TextInput, View
} from "react-native";

import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { GlobalContext } from "../../contexts/global";
import api from "../../servers/api";
import styles from "./styles";

export default function Home() {
  const { register, handleSubmit, setValue } = useForm();
  const { vibrate, setUser, user, setIsLogged, setToken } = useContext(GlobalContext)

  const [codeSent, setCodeSent] = useState(false)


  const handleLogin = useCallback(
    async (data) => {
      try {
        vibrate();
        const response = await api.post(
          `/login`,
          data
        );
        setUser(response.data)
        setCodeSent(true)
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleValidate = useCallback(
    async (data) => {
      try {
        vibrate();
        const novadata = {
          user_id: user.id,
          code: data.code
        }
        data['user_id'] = user?.id
        const response = await api.post(
          `/validation`,
          novadata
        );
        setIsLogged(true)
        setToken(response.data.token)
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );


  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View >
          <Text>LOGO</Text>
        </View>


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
          {...register("user_phone", { required: true, maxLength: 11, minLength: 11 })}
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
          <Button onPress={handleSubmit(handleLogin)} style={styles.buttonRegister} mode="contained">
            <Text style={styles.registerText}>Enviar Código</Text>
          </Button>
        ) : (
          <Button onPress={handleSubmit(handleValidate)} style={styles.button} mode="contained">
            <Text >Entrar</Text>
          </Button>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
