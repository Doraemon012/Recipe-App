import React, { useState } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView, Image, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase";
import { addUser } from "../firebaseFunctions/firebaseFunctions";
import { theme } from "../Theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const authenticate = auth;

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(authenticate, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        // AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
        Alert.alert(
          "Success",
          "Logged in successfully with email: " + userCredential.user.email,
        );
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", error.message);
      });
    setLoading(false);
  };

  const handleSignUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(authenticate, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        // AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
        addUser(userCredential.user.email, userName);
        Alert.alert(
          "Success",
          "Signed up successfully with email: " + userCredential.user.email,
        );
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", error.message);
      });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
        <Image
          source={require("../assets/placeholder.jpg")} // Replace with your image
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login or Sign Up</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          value={email}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="UserName"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button title="Login" onPress={handleLogin} style={styles.button} />
            <Button title="Sign Up" onPress={handleSignUp} style={styles.button} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  image: {
    borderRadius:24,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontWeight:'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#DDDDDD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    padding: 12,
    marginBottom: 16,
  },
});
