import { StatusBar } from "expo-status-bar";
import { Image} from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet,View,Text,Pressable,ActivityIndicator } from "react-native";
import { useState,useEffect } from "react";
import { Link, router } from "expo-router";



// array that holds 2 strings rendered in the button
const buttonText = [
  "Record, relive, and share",
  "keep your recordings safe, accessible offline,\n and backed up in the cloud.",
  "Your voice, your memories, your way."
]



export default function LandingScreen() {
  // state to keep track of the buttonText index
  const [currentTextIndex,setCurrentTextIndex] = useState(0);

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


  const handleLogin = ()=>{
      router.replace("./record");
  }
  const handleRegister = ()=>{
    router.replace("./register")
  }


  return (
   <>
   <SafeAreaView style={styles.safeareaview}>
        <StatusBar style="Dark"/>
            <View style={styles.container}>
              <Image
              resizeMode="contain"
              style={{height:150,width:150}}
              source={require("../assets/microphone.png")}
              />
               <Text style={styles.logoText}>Memo-Wave</Text>
               <Text>"Capture-Share-Remember"</Text>
                {/* <Pressable style={styles.button} onPress={handleNavigation}>
                  <Text style={styles.buttontext}>{buttonText[currentTextIndex]}</Text>
                </Pressable> */}
               {/* Show the loader when state is true */}
                
            </View>  
            <View style={styles.authcontainer}>
              <View style={styles.logocontainer}>
                <Image
                resizeMode="contain"
                style={{height:150,width:150}}
                source={require("../assets/microphone.png")}
                />
              </View>
              <View style={styles.adtextcontainer}>
                <Text style={{textAlign:"center"}}>{buttonText[currentTextIndex]}</Text>
              </View>
              <View style={styles.buttonscontainer}>
                  <Pressable onPress={()=>handleLogin()}>
                    <Text style={styles.signupbutton}>Sign in</Text>
                  </Pressable>
                  <Pressable onPress={()=>handleRegister()}>
                    <Text style={styles.loginbutton}>Login</Text>
                  </Pressable>
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
    height:"60%",
    width:"100%",
    backgroundColor:"white",
    borderTopLeftRadius:25,
    borderTopRightRadius: 25 
  },
  logocontainer:{
    alignItems:"center",
    justifyContent:"center"
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
  signupbutton:{
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
  loginbutton:{
    width:250,
    height:50,
    backgroundColor:"white",
    color:"black",
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
