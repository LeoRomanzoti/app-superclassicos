import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";

export default function Home() {
  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.containerLogo}>
          <Text>LOGO</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          //keyboardType="visible-password"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.buttonSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}
