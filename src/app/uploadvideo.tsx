import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { RootState } from "../state/store";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const VideoUpload = () => {
  const user = useSelector((state: RootState) => state.user);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const selectVideoFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "video/*" });
      console.log(result)
      if(result.assets && result.assets[0]) {
        setVideoFile(result.assets[0])
      }else{
        console.log("Select valid file ")
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick a video file');
    }
  
  };

  const baseUrl = "http://localhost:8000";

  const handleUpload = async () => {
    if (!videoFile || !title || !category) {
      Alert.alert("Error", "All fields are required to upload a video.");
      if(!videoFile) {
        console.log("NO file selected")
      }
      return;
    }
    console.log(videoFile.uri)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    const videoBlob = {
      // uri: videoFile.uri.startsWith("file://") ? videoFile.uri : `file://${videoFile.uri}`,
      uri: videoFile.uri,
      type: videoFile.mimeType || "video/mp4",
      name: videoFile.name,
    };

    const response = await fetch(videoFile.uri);
    const blob = await response.blob();
    formData.append("video_file", blob, videoFile.name);

    // formData.append('video_file' , videoFile) ;

    setIsUploading(true);
    try {
      const response = await axios.post(baseUrl + "/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsUploading(false);
      Alert.alert("Success", "Video uploaded successfully!");
    } catch (error) {
      setIsUploading(false);
      Alert.alert("Upload Failed", "There was an error uploading the video.");
      console.error("Upload error:", error);
    }
  };

  // Display login prompt if the user is not authenticated
  if (!user.isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authText}>Please log in to upload videos.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Upload Video</Text>

      <TouchableOpacity style={styles.fileInput} onPress={selectVideoFile}>
        <Icon name="cloud-upload-outline" size={24} color="white" />
        <Text style={styles.fileText}>
          {videoFile ? videoFile.name : "Select Video File"}
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Icon name="text-outline" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Video Title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="folder-outline" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Category"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Icon name="arrow-up-circle-outline" size={24} color="white" />
        <Text style={styles.uploadButtonText}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  fileInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    marginBottom: 20,
  },
  fileText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "white",
    paddingVertical: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#3D94F6",
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default VideoUpload;
