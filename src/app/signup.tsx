import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
    const baseUrl = "http://localhost:8000"
  const handleSignUp = async () => {
    try{
      const res = axios.post(baseUrl + "/api/register" ,{
        username : username , 
        email : email ,
        first_name : firstName , 
        last_name : lastName , 
        password : password , 
        password2 : password
      })
      router.push("/login");
    }catch(err) {
      console.log(err)
    }
  };  

  return (
    <LinearGradient
      colors={["#ff7e5f", "#feb47b"]}
      style={styles.container}
    >
      <Animatable.View animation="fadeInDown" duration={1500} style={styles.header}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Join us and start exploring!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={1500} style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#E0E0E0"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E0E0E0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#E0E0E0"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#E0E0E0"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#E0E0E0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Already have an account? Log In</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#f5f5f5",
  },
  form: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#feb47b",
  },
  signUpButton: {
    height: 50,
    backgroundColor: "#ff7e5f",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 15,
    alignItems: "center",
  },
  loginText: {
    color: "#ff7e5f",
    fontSize: 14,
  },
});

export default SignUpPage;
