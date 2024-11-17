import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../state/auth/authSlice";
import { RootState , AppDispatch } from "../state/store";
import { useRouter } from "expo-router";

const LoginScreen : React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>() ;
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      router.push("/homefeed");
    } catch (error) {
      Alert.alert("Wrong Username or password")
      console.error("Login failed:", error);
    }
  };


  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={styles.header}
      >
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={1500} style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/signup")}
          style={styles.signupButton}
        >
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#d3d3d3",
  },
  form: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    height: 50,
    backgroundColor: "#3b5998",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#4c669f",
    fontSize: 14,
  },
});

export default LoginScreen;
