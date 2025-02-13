import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import { useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { ActivityIndicator } from "react-native-web";
import { router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { Switch } from "react-native";
import ProfilePage from "./profile";
import { auth } from '../Config/firebase';
import { db } from '../Config/firebase';
import { doc, getDoc,updateDoc } from "firebase/firestore";



export default function RecordingScreen() {

  // STATES
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState("recording-screen");
  const [timer,setTimer] = useState(0);
  const [intervalid, setIntervalId] = useState(null)
  const [userDetails, setUserDetails] = useState({ email: "", phoneNumber: "" });

  
  // FUNCTIONS
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Get the current user
        const currentUser = auth.currentUser;

        if (currentUser) {
          // Reference the user document in Firestore
          const userDocRef = doc(db, "users", currentUser.uid);

          // Fetch the user document
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Set user details to state
            setUserDetails(userDoc.data());
          
          
          } else {
            console.error("No such user document found!");
          }
        } else {
          console.error("No user is logged in.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      } finally {
        setloading(false); // Hide the loader
      }
    };


    fetchUserDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  console.log("this data",userDetails)



  // Update userDetails 
  const updateUserDetails = async (updatedDetails) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, updatedDetails);
        setUserDetails(updatedDetails); // Update state with new details
        alert("Details updated successfully!");
      } else {
        alert("No user is logged in.");
      }
    } catch (error) {
      console.error("Error updating user details:", error.message);
      alert("Failed to update details.");
    }
  };



  // Date and time formating
  const now = Date.now();
  const date = new Date(now);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date and time as a string
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;



  // Filter Recordings Search
  const filteredRecordings = recordings.filter(
    (recording) =>
      (recording.title || "").toLowerCase().includes(searchQuery.toLowerCase()) // Ensure title exists before calling toLowerCase()
  );



  // Function to start recording audio
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);

        const id = setInterval(()=>{
          setTimer((prev)=>prev+1)
        },1000)
        setIntervalId(id)
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }


  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const savedRecordings = await AsyncStorage.getItem("recordings");
        if (savedRecordings) {
          setRecordings(JSON.parse(savedRecordings));
        }
      } catch (error) {
        console.error("Error loading recordings:", error);
      }
    };

    loadRecordings();
  }, []);

  // NAVIGATE BACK TO THE PREVIOUS PAGE
  const handleBack = () => {
    setloading(true);

    setTimeout(() => {
      router.replace("./navigation");
      setloading(false);
    }, 1000);
  };



  // Function to stop recording audio
  async function stopRecording() {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      const { sound, status } = await Audio.Sound.createAsync({ uri });

      const newRecording = {
        uri, 
        duration: getDurationFormatted(status.durationMillis), 
      };
      // Update state with new recording
      setRecordings((prevRecordings) => [...prevRecordings, newRecording]);
      // Save to AsyncStorage
      const savedRecordings = await AsyncStorage.getItem("recordings");
      const recordingsArray = savedRecordings
        ? JSON.parse(savedRecordings)
        : [];
      recordingsArray.push(newRecording);
      await AsyncStorage.setItem("recordings", JSON.stringify(recordingsArray));

      Toast.show({
        type: "success",
        text1: "Recording Saved!",
        text2: "Your recording has been successfully saved.",
        position: "top",
      });

      clearInterval(intervalid);
      setIntervalId(null);
      setTimer(0);

      setRecording(null);
    } catch (error) {
      console.error("Error stopping recording:", error);

      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Failed to save the recording.",
        position: "top",
      });
    }
  }


//  Share recording
  const shareRecording = async (recordingLine) => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Toast.show({
          type: "error",
          text1: "Sharing Unavailable",
          text2: "Sharing is not supported on this device.",
          position: "top",
        });
        
        return;
      }
      // Ensure we have a valid URI
      if (!recordingLine?.uri) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No recording file found.",
          position: "top",
        });
        return;
      }

      // Check file exists and is readable
      const fileInfo = await FileSystem.getInfoAsync(recordingLine.uri);
      if (!fileInfo.exists) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Recording file is missing.",
          position: "top",
        });
        return;
      }
      // Generate a shareable filename
      const fileName = `Recording_${new Date()
        .toISOString()
        .replace(/:/g, "-")}.mp4`;
      const newUri = `${FileSystem.documentDirectory}${fileName}`;
      // Copy the file to a shareable location
      await FileSystem.copyAsync({
        from: recordingLine.uri,
        to: newUri,
      });

      // Share the file
      await Sharing.shareAsync(newUri, {
        mimeType: "audio/mp4", // Adjust mime type as needed
        dialogTitle: "Share Your Recording",
      });
    } catch (error) {
      console.error("Error sharing recording:", error);
      Toast.show({
        type: "error",
        text1: "Sharing Failed",
        text2: "Unable to share the recording.",
        position: "top",
      });
    }
  };



  // Helper function to format recording duration
  function getDurationFormatted(milliseconds) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }



  // Function to delete a recording by index
  const deleteRecording = async (index) => {
    Alert.alert(
      `Delete Recording #${index + 1}`,
      "Are you sure you want to delete this recording?",
      [
        {
          text: "Yes",
          onPress: async () => {
            setRecordings((prevRecordings) => {
              const updatedRecordings = prevRecordings.filter(
                (_, i) => i !== index
              );
  
              AsyncStorage.setItem(
                "recordings",
                JSON.stringify(updatedRecordings)
              ).catch((error) =>
                console.error("Error updating AsyncStorage:", error)
              );
  
              return updatedRecordings;
            });
  
            setTimeout(() => {
              Toast.show({
                type: "success",
                text1: "Recording Deleted",
                text2: "Your recording has been successfully Deleted.",
                position: "top",
              });
            }, 100);
  
            console.log(`Recording #${index + 1} deleted`);
          },
          style: "destructive",
        },
        {
          text: "No",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
      ]
    );
  };

  const toggleSettings = () => {
    setSettings(settings === "recording-screen" ? "settings" : "recording-screen");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  // Function to render each recording item
  function getRecordingLines() {
    const playSound = async (uri) => {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri });
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync(); // Unload sound when playback is finished
          }
        });
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    };
    const updateRecordingTitle = async (index, newTitle) => {
      try {
        // Update title in the state
        const updatedRecordings = recordings.map((recording, i) =>
          i === index ? { ...recording, title: newTitle } : recording
        );
        setRecordings(updatedRecordings);

        // Persist updated recordings in AsyncStorage
        await AsyncStorage.setItem(
          "recordings",
          JSON.stringify(updatedRecordings)
        );
      } catch (error) {
        console.error("Error updating recording title:", error);
      }
    };

    return filteredRecordings.map((recordingLine, index) => (
      <Pressable 
        key={index} 
        onLongPress={() => deleteRecording(index)}
        style={({ pressed }) => [
          styles.recordingItem,
          pressed && styles.recordingItemPressed
        ]}
      >
        <View style={styles.row}>
          {/* Editable title */}
          <View style={styles.textDate}>
            <TextInput
              style={styles.recordInput}
              value={recordingLine.title || `Recording #${index + 1}`}
              onChangeText={(newTitle) => updateRecordingTitle(index, newTitle)}
              placeholder="Enter title"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.metadata}>
              {recordingLine.duration} | {formattedDate} | {formattedTime}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable 
              onPress={() => playSound(recordingLine.uri)} 
              style={styles.iconButton}
            >
              <Feather name="play" size={20} color="#6366F1" />
            </Pressable>
            {/* Share button */}
            <Pressable 
              onPress={() => shareRecording(recordingLine)} 
              style={styles.iconButton}
            >
              <Feather name="share" size={20} color="#6366F1" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    ));
    }
    
    // FRONT END LAYOUT
    return (
      <>
        {settings === "recording-screen" ? (
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="light" />
            
            <View style={styles.mainContainer}>
              <ScrollView style={styles.recordingListContainer}>
                <View>
                 
                  <View style={styles.topContainer}>
                    <Text style={styles.headerText}>Your Recordings</Text>
                    <Pressable 
                      style={styles.settingsButton} 
                      onPress={toggleSettings}
                    >
                      <Feather name="settings" size={24} color="#FFFFFF" />
                    </Pressable>
                  </View>
                  
                  <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#6366F1" style={styles.searchIcon} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search recordings..."
                      placeholderTextColor="#94A3B8"
                      value={searchQuery}
                      onChangeText={(text) => setSearchQuery(text)}
                    />
                  </View>
                  <Toast/>
                  {getRecordingLines()}
                  {loading && (
                    <View style={styles.loaderContainer}>
                      <ActivityIndicator size="large" color="#6366F1" />
                    </View>
                  )}
                </View>
              </ScrollView>
    
              {/* Recording Controls */}
              <View style={styles.controlsContainer}>
                <Text style={styles.timer}>{formatTime(timer)}</Text>
                <Pressable
                  style={[
                    styles.recordButton,
                    recording && styles.recordingActive
                  ]}
                  onPress={recording ? stopRecording : startRecording}
                >
                  {recording ? (
                    <FontAwesome6 name="pause" size={24} color="white" />
                  ) : (
                    <Octicons name="dot-fill" size={40} color="white" />
                  )}
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        ) : (
          <ProfilePage
            settings={settings}
            setSettings={setSettings}
            toggleSettings={toggleSettings}
            userDetails={userDetails}
            updateUserDetails={updateUserDetails}
            setUserDetails={setUserDetails}
          />
        )}
      </>
    )};
    
    const styles = StyleSheet.create({
      safeAreaView: {
        flex: 1,
        backgroundColor: '#0F172A', // Dark background for modern look
      },
      mainContainer: {
        flex: 1,
        backgroundColor: '#0F172A',
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
      },
      headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
      },
      settingsButton: {
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      recordingListContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 100,
        backgroundColor: '#1E293B', // Darker container for contrast
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 16,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#334155',
        borderRadius: 20,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      searchIcon: {
        marginRight: 12,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
      },
      recordingItem: {
        backgroundColor: '#334155',
        borderRadius: 20,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      recordingItemPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      textDate: {
        flex: 1,
      },
      recordInput: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
      },
      metadata: {
        fontSize: 14,
        color: '#94A3B8',
      },
      buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      },
      iconButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
      },
      controlsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1E293B',
        paddingVertical: 24,
        paddingHorizontal: 30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
      },
      timer: {
        fontSize: 36,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 20,
        letterSpacing: 2,
      },
      recordButton: {
        height: 72,
        width: 72,
        borderRadius: 36,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
      recordingActive: {
        backgroundColor: '#6366F1',
        shadowColor: '#6366F1',
      },
      loaderContainer: {
        padding: 20,
        alignItems: 'center',
      },
    });