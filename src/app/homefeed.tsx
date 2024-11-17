import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "../state/store";
import axios from "axios";
import HeaderButton from "../components/HeaderButton";

const HomeFeed = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [videos, setVideos] = useState([]); 

  const handlePress = (video) => {
    router.push({
      pathname: "/videoDetail",
      params: { 
        id: video.id,
        video: video.video_url,
        title: video.title,
        thumbnail: video.thumbnail,
        like_count: video.like_count
      }
    });
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    if(!user.isAuthenticated) {
      setVideos([])
      Alert.alert("Error", "Please Login to View videos")
      return 
    }

    const getVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/listvideos", {
          headers: {
            Authorization: `Bearer ${user.access_token}`
          }
        });
        setVideos(response.data);
      } catch (err) {
        console.log("error occurred", err);
      }
    };
    getVideos();
  }, [user, router]);

  if (!user) return null; 

  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.videoContainer} onPress={() => handlePress(item)} >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user.firstName}</Text>
        <View style={styles.buttonContainer}>
          <HeaderButton title="Upload Video" navigateTo="/uploadvideo" />
          <HeaderButton title="Logout" navigateTo="/logout" />
        </View>
      </View>
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1C1C1E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    color: "#A3E8FC",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    padding: 10,
    textAlign: "center",
  },
});

export default HomeFeed;
