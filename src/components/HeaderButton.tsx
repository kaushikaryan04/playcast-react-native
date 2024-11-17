// HeaderButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { logout } from "../state/auth/authSlice";
interface HeaderButtonProps {
  title: string;
  navigateTo: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ title, navigateTo }) => {
  const router = useRouter();

  const dispatch = useDispatch() 
  const handlePress = () => {
    if(navigateTo === "/logout") {
        dispatch(logout());
        router.push("/login")
        return 
    }
    router.push(navigateTo);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#A3E8FC",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#1C1C1E",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});

export default HeaderButton;
