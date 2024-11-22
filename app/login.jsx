import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet,View,Text,Pressable,ActivityIndicator } from "react-native";
import { useState,useEffect } from "react";
import { router } from "expo-router";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native";
import { auth } from "../Config/firebase";
import {signInWithEmailAndPassword} from "firebase/auth"
import Toast from "react-native-toast-message";

// array that holds 2 strings rendered in the button
const buttonText = [
  "Record, relive, and share",
  "keep your recordings safe, accessible offline,\n and backed up in the cloud.",
  "Your voice, your memories, your way."
]



export default function LoginScreen() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('')
  // state to keep track of the buttonText index
  const [currentTextIndex,setCurrentTextIndex] = useState(0);
  const navigation = useNavigation()
 

  // Use effect with timer to display each and every word in the buttonText
  useEffect(()=>{
    // Timer
    const interval = setInterval(()=>{ 
      setCurrentTextIndex((prevIndex)=>
      prevIndex === buttonText.length - 1 ? 0 : prevIndex + 1
      );
    },2000);
    // Unmount and clear the timer
    return()=>clearInterval(interval)
  },[])

  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      // Show success toast
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });
  
      setEmail("");
      setPassword("");
  
      // Delay navigation by 2 seconds
      setTimeout(() => {
        router.push("/record");
      }, 3000); // 2000ms = 2 seconds
    } catch (error) {
      // Show error toast
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
  
      setError(error.message);
    }
  };
  

  const handleGoBack = ()=>{
    navigation.goBack();
  }

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
               <Text style={{fontSize:50, fontWeight:"bold"}}>Login</Text>
              </View>
              <View style={styles.adtextcontainer}>
                <Text style={{textAlign:"center"}}>{buttonText[currentTextIndex]}</Text>
              </View>

              <View style={styles.buttonscontainer}>
                  <TextInput 
                  placeholder="Email"
                  style={styles.emailInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                  placeholder="Password"
                  style={styles.passwordInput}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  ></TextInput>
              </View>

              <View style={styles.logincontainer}>
              {error && <Text style={{ color: "red" }}>{error}</Text>}
                <Pressable onPress={()=>handleLogin()}><Text style={styles.loginbutton}>Login</Text></Pressable>
                <Link href="#">Forgot Password?</Link>
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
    marginBottom:20

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
      gap:10
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
  }


})
