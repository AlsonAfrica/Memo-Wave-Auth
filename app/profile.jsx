import React, { useState } from 'react';
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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const ProfilePage = ({ setting, setSettings, toggleSettings, userDetails, updateUserDetails, setUserDetails }) => {
  // States
  const [loading, setLoading] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isDataSyncEnabled, setIsDataSyncEnabled] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Functions
  const handleSave = () => {
    updateUserDetails(userDetails); // Call the function passed as a prop
  };

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback(''); // Clear the input after submission
  };

  // UI button toggles
  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);
  const toggleDarkMode = () => setIsDarkModeEnabled((prev) => !prev);
  const toggleDataSync = () => setIsDataSyncEnabled((prev) => !prev);

  // Settings
  const renderSettingRow = (title, value, onToggle, icon) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Feather name={icon} size={20} color="#94A3B8" />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#475569', true: '#6366F1' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable style={styles.settingsButton} onPress={toggleSettings}>
            <Feather name="mic" size={24} color="#6366F1" />
          </Pressable>
        </View>

        {/* <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Feather name="user" size={40} color="#6366F1" />
          </View>
          <Pressable style={styles.editButton}>
            <Feather name="edit-2" size={16} color="#FFFFFF" />
          </Pressable>
        </View> */}

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={20} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              placeholderTextColor="#94A3B8"
              value={userDetails.email || ''}
              onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="phone" size={20} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={userDetails.phoneNumber || ''}
              onChangeText={(text) => setUserDetails({ ...userDetails, phoneNumber: text })}
            />
          </View>

          <Pressable onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {/* {renderSettingRow('Notifications', isNotificationsEnabled, toggleNotifications, 'bell')} */}
          {/* {renderSettingRow('Dark Mode', isDarkModeEnabled, toggleDarkMode, 'moon')} */}
          {renderSettingRow('Data Sync', isDataSyncEnabled, toggleDataSync, 'refresh-cw')}
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.sectionTitle}>Share Your Thoughts</Text>
          <View style={styles.feedbackInputWrapper}>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Write your feedback here..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              maxLength={250}
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>
          <Pressable style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Send Feedback</Text>
          </Pressable>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366F1" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark background
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
    color: '#FFFFFF',
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
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    right: '35%',
    bottom: 12,
    backgroundColor: '#6366F1',
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
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  feedbackContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  feedbackInputWrapper: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  feedbackInput: {
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
});

export default ProfilePage;