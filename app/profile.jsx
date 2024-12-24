import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { auth } from '../Config/firebase';
import { db } from '../Config/firebase';
import { doc, getDoc } from "firebase/firestore";



const ProfilePage = ({setting, setSettings,toggleSettings}) => {
  
  // States
  const [loading, setLoading] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isDataSyncEnabled, setIsDataSyncEnabled] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  
  // Functions
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
              console.log(userDetails.email)
            } else {
              console.error("No such user document found!");
            }
          } else {
            console.error("No user is logged in.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error.message);
        } finally {
          setLoading(false); // Hide the loader
        }
      };
  
      fetchUserDetails();
    }, []);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }



  // UI button toggles
  const toggleNotifications = () => setIsNotificationsEnabled(prev => !prev);
  const toggleDarkMode = () => setIsDarkModeEnabled(prev => !prev);
  const toggleDataSync = () => setIsDataSyncEnabled(prev => !prev);

  // Settings
  const renderSettingRow = (title, value, onToggle, icon) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Feather name={icon} size={20} color="#666" />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D1D6', true: '#5AB8A6' }}
        thumbColor={value ? '#fff' : '#fff'}
      />
    </View>
  );

  // Beginning of UI element
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable style={styles.settingsButton} onPress={()=>toggleSettings()}>
           <Feather name="mic" size={24} color="black" />
          </Pressable>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Feather name="user" size={40} color="#5AB8A6" />
          </View>
          <Pressable style={styles.editButton}>
            <Feather name="edit-2" size={16} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              placeholderTextColor="#999"
              value={userDetails.email}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="phone" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={userDetails.phoneNumber}
            />
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {renderSettingRow('Notifications', isNotificationsEnabled, toggleNotifications, 'bell')}
          {renderSettingRow('Dark Mode', isDarkModeEnabled, toggleDarkMode, 'moon')}
          {renderSettingRow('Data Sync', isDataSyncEnabled, toggleDataSync, 'refresh-cw')}
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          <View style={styles.feedbackInputWrapper}>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Write your feedback here..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              maxLength={250}
            />
          </View>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5AB8A6" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
// End of UI elements


// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F7F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    right: '35%',
    bottom: 12,
    backgroundColor: '#5AB8A6',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  feedbackContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackInputWrapper: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
  },
  feedbackInput: {
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ProfilePage;