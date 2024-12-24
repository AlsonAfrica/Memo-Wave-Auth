import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView } from "react-native";
import { StyleSheet,View,Text,Pressable,ActivityIndicator } from "react-native";
import { useState,useEffect } from "react";
import { router } from "expo-router";
import {Stack} from "expo-router";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { auth,db } from "../Config/firebase";
import Toast from 'react-native-toast-message';
import {createUserWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; // Firestore functions

export default function RegisterScreen() {
  
  
  const [fullName,setfullName] = useState('');
  const [email,setEmail] = useState('');
  const [phoneNumber,setphoneNumber] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Passwords do not match",
      });
      return;
    }
  
    setLoading(true); // Show loader
    try {
      // Attempt to create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);
  
      // Save additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
  
      // Success toast
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "You can now log in",
      });
  
      // Navigate to login screen
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Delay navigation to allow the success toast to be visible
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // Specific handling for email already in use
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: "This email is already registered. Please log in or use a different email.",
        });
      } else {
        // General error handling
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: error.message,
        });
      }
    } finally {
      // Ensure the loader remains visible for at least 2 seconds
      setTimeout(() => {
        setLoading(false); // Hide loader after delay
      }, 2000);
    }
  };
  

  return (
   <> 
   <SafeAreaView style={styles.safeareaview}>
        <StatusBar style="Dark"/>
        <Toast/>
            <View style={styles.container}>
              <Image
              resizeMode="contain"
              style={{height:150,width:150}}
              source={require("../assets/microphone.png")}
              />
               <Text style={styles.logoText}>Memo-Wave</Text>
               <Text>"Capture-Share-Remember"</Text>
            </View>  
            <View style={styles.authcontainer}>
              <View style={styles.logocontainer}>
               <Text style={{fontSize:50, fontWeight:"bold"}}>Register</Text>
              </View>
             <ScrollView>
                <View style={styles.buttonscontainer}>
                  <View style={{flex:1}}>
                     {loading && <ActivityIndicator size="large" color="white" marginTop="10"/>}
                  </View>
                    <TextInput 
                    placeholder="Full Name"
                    style={styles.emailInput}
                    value={fullName}
                    onChangeText={setfullName}
                    ></TextInput>

                    <TextInput
                    placeholder="Phone Number"
                    style={styles.passwordInput}
                    value={phoneNumber}
                    onChangeText={setphoneNumber}
                    ></TextInput>

                    <TextInput
                    placeholder="E-mail"
                    style={styles.passwordInput}
                    value={email}
                    onChangeText={setEmail}
                    ></TextInput>

                    <TextInput
                    placeholder="Password"
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    ></TextInput>

                     <TextInput
                    placeholder=" Confirm Password"
                    style={styles.passwordInput}
                    value={confirmPassword}
                    onChangeText={setconfirmPassword}
                    secureTextEntry
                    ></TextInput>
              </View>
             </ScrollView>
              <View style={styles.logincontainer}>
                 {error && <Text style={{color:"red", fontWeight:"bold"}}>Passwords Do Not Match</Text>}
                <Pressable onPress={()=>handleRegister()}><Text style={styles.loginbutton}>Register</Text></Pressable>
                  <Text>Beta Version 1.0</Text>
              </View>            
            </View>         
   </SafeAreaView>
   </>
  );
}

// Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeareaview:{
    backgroundColor:"#5AB8A6",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    height:"100%"
  },
  button:{
    width:100,
    height:60,
    backgroundColor:"#21609e",
    borderRadius:10,
    color:"white",
    justifyContent:'center',
    marginTop:10,

  },
  logoText:{
    fontSize:40,
    fontFamily:"Sans"
  },
  buttontext:{
    textAlign:"center",
    fontSize:15,
    color:"white"
  },
  authcontainer:{
    height:"65%",
    width:"100%",
    backgroundColor:"white",
    borderTopLeftRadius:25,
    borderTopRightRadius: 25 
  },
  logocontainer:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:2

  },
  adtextcontainer:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    height:30
  },
  buttonscontainer:{
      marginTop:40,
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      gap:20
  },
  emailInput:{
    width:250,
    height:50,
    backgroundColor:"white",
    color:"grey",
    textAlign:"center",
    padding:15,
    borderRadius:25,
    borderWidth:2,
    borderColor:"#5AB8A6",
         // Shadow for iOS
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.3,
         shadowRadius: 6,
     
         // Shadow for Android
         elevation: 10, 
  },
  passwordInput:{
    width:250,
    height:50,
    backgroundColor:"white",
    color:"grey",
    textAlign:"center",
    padding:15,
    borderRadius:25,
    borderWidth:2,
    borderColor:"#5AB8A6",
         // Shadow for iOS
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.3,
         shadowRadius: 6,
     
         // Shadow for Android
         elevation: 10, 
  },
  logincontainer:{
      justifyContent:"center",
      alignItems:"center",
      marginTop:15,
      gap:10,
      padding:20
  },
  loginbutton:{
    width:250,
    height:50,
    backgroundColor:"black",
    color:"white",
    textAlign:"center",
    padding:15,
    borderWidth:2,
    borderRadius:25,
         // Shadow for iOS
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.3,
         shadowRadius: 6,
     
         // Shadow for Android
         elevation: 10, 
  },
  loader:{
    
  }


})
