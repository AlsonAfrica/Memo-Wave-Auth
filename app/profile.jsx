import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { Text, TextInput, View, Pressable } from "react-native";
import { Switch } from "react-native";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import Feather from "@expo/vector-icons/Feather";

const Profile = ({ toggleSettings }) => {
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar style="Dark" />
        <ScrollView style={styles.Profilecontainer}>
          <View>
            <Toast />

            <View style={styles.topcontainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                Profile
              </Text>
              <Pressable style={styles.settingsbutton} onPress={toggleSettings}>
                <Feather name="mic" size={24} color="black" />
              </Pressable>
            </View>
            <View style={styles.personalDataContainer}>
              <TextInput
                placeholder="Name"
                style={styles.nameinput}
              ></TextInput>

              <TextInput
                placeholder="Phonenumber"
                style={styles.phonenumberinput}
              ></TextInput>

              <TextInput
                placeholder="Password"
                style={styles.passwordinput}
              ></TextInput>
            </View>
            <View style={styles.togglescontainer}>
              <View style={styles.notificationtoggle}>
                <Text>Notifications</Text>
                <Switch />
              </View>
              <View style={styles.darkmodetoggle}>
                <Text>Dark-Mode</Text>
                <Switch />
              </View>
              <View style={styles.datatoggle}>
                <Text>Data-Sync</Text>
                <Switch />
              </View>
            </View>
            <View style={styles.feedbackcontainer}>
              <Text>Feedback</Text>
              <TextInput
                style={styles.feedbackinput}
                placeholder="Write your feedback here..."
                multiline={true}
                numberOfLines={4}
                maxLength={250}
              />
            </View>
          </View>
          <View style={styles.buttonscontainer}>
            <Pressable style={styles.sendbutton}>
                <Text style={{color:"white", textAlign:'center'}}>Submit</Text>
            </Pressable>
            <View>
            <Pressable style={styles.sendbutton}>
                <Text style={{color:"red", textAlign:'center'}}>Logout</Text>
            </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#5AB8A6",
    alignItems: "center",
  },
  button: {
    padding: 15,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    marginVertical: 10,
    borderRadius: "50%",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
  },

  topcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  settingsbutton: {
    marginTop: 20,
  },

  // Second Container
  Profilecontainer: {
    // flex: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    width: "95%",
    backgroundColor: "white",
    paddingHorizontal: 20,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Shadow for Android
    elevation: 10,
  },

  personalDataContainer: {
    marginTop: 50,
    Display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  nameinput: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    color: "grey",
    textAlign: "center",
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#5AB8A6",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 10,
  },
  phonenumberinput: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    color: "grey",
    textAlign: "center",
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#5AB8A6",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Shadow for Android
    elevation: 10,
  },
  passwordinput: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    color: "grey",
    textAlign: "center",
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#5AB8A6",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 10,
  },
  togglescontainer: {
    marginTop: 50,
    Display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  notificationtoggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 170,
    width: "100%",
  },
  darkmodetoggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 170,
    width: "100%",
  },
  datatoggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 170,
    width: "100%",
  },
  feedbackcontainer: {
    marginTop: 50,
    Display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  feedbackinput: {
    width: 300,
    height: 200,
    backgroundColor: "white",
    color: "grey",
    textAlign: "center",
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#5AB8A6",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 10,
  },
  buttonscontainer:{
    marginTop:40,
    marginBottom:40,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    gap:20
},
sendbutton:{
    width:250,
    height:50,
    backgroundColor:"black",
    color:"white",
    textAlign:"center",
    padding:15,
    borderRadius:25,
         // Shadow for iOS
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.3,
         shadowRadius: 6,
     
         // Shadow for Android
         elevation: 10, 
  },
});

export default Profile;
