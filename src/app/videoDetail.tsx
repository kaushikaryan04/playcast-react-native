import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, TextInput } from "react-native";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

interface VideoParams {
  id : number ;
  title : string ;
  video : string ;
  like_count : number ;
}


const VideoDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as unknown as VideoParams;
const { id, title, video, like_count } = params;

  // const { id, title, video, like_count } = useLocalSearchParams();

  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);
  const [newComment, setNewComment] = useState("");
  const [allComments , setAllComments ] = useState([]) ; 
  const user = useSelector((state:RootState)=>state.user) ; 
  const handleLike = async () => {
    console.log("like count " , like_count) 

    if (!hasLiked) {
      setHasLiked(true);

    } else {
      setHasLiked(false);

    }
    try{
        const keyword = hasLiked ? "likevideo" : "dislikevideo"
        const r = await axios.post(baseUrl + "/api/" + keyword ,
          {
          video_id : id
        },
        {
          headers:{
            Authorization : `Bearer ${user.access_token}`,
          }
        }
      
      )
    }catch(err) {
      console.log(err)
    }
  }


  const baseUrl = "http://localhost:8000"

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.commentUser}>{item.username}</Text>
      <Text style={styles.commentText}>{item.content}</Text>
    </View>
  );
   useEffect(()=> {

  async function getComments() {
    const response = await axios.get(`${baseUrl}/api/listcomments`, {
      headers: {
        Authorization : `Bearer ${user.access_token}`
      },
      params: {
        video_id: id
      }
    });
      setAllComments(response.data);
      }

      getComments();
   },[])

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: video}} 
          style={styles.videoPlayer}
          useNativeControls 
          resizeMode="contain"
          shouldPlay={false} 
        />
        <Text style={styles.videoTitle}>{title}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button       title={` ${hasLiked ? "👎" :"👍"  } Like (${Number(like_count) + (hasLiked ? 1 : 0)})`}
         onPress={handleLike} />
      </View>

      <Text style={styles.commentsTitle}>Comments</Text>
      <FlatList
        data={allComments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        style={styles.commentsList}
      />

      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button
          title="Post"
          onPress={async () => {
          if (newComment == "" || !newComment) return ; 
           try{ 
            const res = await axios.post(baseUrl + "/api/addcomment",
              {
                content: newComment,
                video_id: id,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                },
              }
            )
            const obj = {
              content : newComment ,
              username : user.username
            }
            setAllComments([...allComments , obj])
            
          }catch(err ) {
            console.log("error" , err) 
          }
          setNewComment("")
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    padding: 10,
  },
  videoContainer: {
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  videoPlayer: {
    width: "100%",
    height: 200,
  },
  videoTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  commentsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentsList: {
    marginBottom: 20,
  },
  comment: {
    backgroundColor: "#2C2C2E",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentUser: {
    color: "#A3E8FC",
    fontWeight: "bold",
  },
  commentText: {
    color: "white",
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: "#A3E8FC",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "white",
    marginRight: 10,
    borderRadius: 5,
  },
});

export default VideoDetail;
