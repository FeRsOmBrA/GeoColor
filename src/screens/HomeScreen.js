import { View, Text, StyleSheet, TouchableHighlight, Dimensions, Button, TouchableOpacity, ImageBackground } from 'react-native'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import ImageColors from "react-native-image-colors"
import TypeWriter from '../utils/TypeWriter'
const HomeScreen = ({ navigation }) => {
   let [fontsLoaded] = useFonts({
      Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold
   })

   const background = require("../img/background.png")
   const cat = require("../img/cat.jpg")
   const [color, setColor] = useState(null)
   useEffect(async () => {
      

   }, [])

   return (
      <>
         <ImageBackground source={background} style  = {styles.background}>
            <View style={styles.header}>

               <Text style={styles.title}>Welcome to GeoColor App</Text>
               <TypeWriter dev= {true} text="With this application, you can extract  main colors of any image and see each color representation in different formats as well." styleText={styles.welcomeText} styleView = {styles.welcome} />

            

            </View>
            <View style={styles.footer} >
            <TouchableOpacity onPress={()=> {navigation.navigate("MainScreen")}} style={styles.chooseButton} >
               <Feather name='arrow-right' color= "white" size={24} />
              <Text style={styles.btnText}>Let's try </Text>
            </TouchableOpacity>
          </View>

         </ImageBackground>

      </>
   )
}

const styles = StyleSheet.create({
   chooseButton: {
      backgroundColor: '#ff9800',
      alignItems: 'center',
      padding: 20,
      borderRadius: 30,
      opacity: 0.9
  
    },
   background: { 
      width: '100%',
   height: '100%',

   },
   header: {
      padding: 50,
      zIndex: 1,
   },

   title: {
      fontSize: 30,
      paddingBottom: 40,
      color: "#F6EEE5",
      fontFamily: "Montserrat_700Bold",
   },
   welcome: {
      marginTop: 20,
      backgroundColor: '#F6EEE5',
      borderRadius: 20,
      padding: 15,
      opacity: 0.9
   },
   welcomeText: {
      fontSize: 18,
      fontFamily: "Montserrat_400Regular"

   },

   footer: {
     
      width: '100%',
      height: '100%',
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1
   },
   btn: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#B6967E',
      borderRadius: 20,
      padding: 20,

      width: '100%',


   },
   btnText: {

      color: 'white',
      fontFamily: 'Montserrat_600SemiBold',
      fontSize: 17,
   }
})

export default HomeScreen;
