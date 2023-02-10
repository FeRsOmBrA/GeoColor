import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker'
import ImageViewer from "../utils/ImageViewer";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler } from 'react-native-reanimated'
import { TapGestureHandler } from "react-native-gesture-handler";
import * as munsell from 'munsell'
const initialState = {
  colorOne: { value: '', name: '', munsellFormat: '' },
  colorTwo: { value: '', name: '', munsellFormat: '' },
  colorThree: { value: '', name: '', munsellFormat: '' },
  colorFour: { value: '', name: '', munsellFormat: '' },
  rawResult: '',
}
import ImageColors from "react-native-image-colors";

export default function MainScreen({ navigation }) {

  const background = require("../img/background.png")
  const placeholder = require("../img/default-placeholder.png")
  const [Photo, setPhoto] = useState(null)
  const [colors, setColors] = useState(initialState)
  const [showColorButtons, setShowColorButtons] = useState(false)
  const [showColors, setShowColors] = useState(false)
  const [showCircles, setShowCircles] = useState(false)


  const offset = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }]
    }
  })
  const TakePhotoAsync = async () => {
    await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true
    }).then(async photo => {

      setPhoto(photo.uri)
      await ImageColors.getColors(photo.uri, {}).then(r => {
        switch (r.platform) {
          case 'android':
          case 'web':
            setColors({
              colorOne: { value: result.lightVibrant, name: 'lightVibrant', munsellFormat: munsell.hexToMunsell(result.lightVibrant) },
              colorTwo: { value: result.dominant, name: 'dominant', munsellFormat: munsell.hexToMunsell(result.dominant) },
              colorThree: { value: result.vibrant, name: 'vibrant', munsellFormat: munsell.hexToMunsell(result.vibrant) },
              colorFour: { value: result.darkVibrant, name: 'darkVibrant', munsellFormat: munsell.hexToMunsell(result.darkVibrant) },
              rawResult: JSON.stringify(result),
            })
            break
          case 'ios':
            setColors({
              colorOne: { value: result.background, name: 'background', munsellFormat: munsell.hexToMunsell(result.background) },
              colorTwo: { value: result.detail, name: 'detail', munsellFormat: munsell.hexToMunsell(result.detail) },
              colorThree: { value: result.primary, name: 'primary', munsellFormat: munsell.hexToMunsell(result.primary) },
              colorFour: { value: result.secondary, name: 'secondary', munsellFormat: munsell.hexToMunsell(result.secondary) },
              rawResult: JSON.stringify(result),
            })
            break
          default:
            throw new Error('Unexpected platform')
        }
      })
      setShowColorButtons(true)
    })


  }
  const LoadPhotoAsync = async () => {
    await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true
    }).then(photo => {

      setPhoto(photo.uri)
      setShowColorButtons(true)

    })
  }
  const pressed = useSharedValue(false)
  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressed.value ? 1.25 : 1) }]
    }
  })
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      console.log(event)
      pressed.value = true
    },
    onEnd: (event, ctx) => {
      pressed.value = false
    }
  })
  const startResultAnimation = () => {
    fetchColors()
    setShowCircles(true)
  }
  const resetApp = () => {
    setShowCircles(false)
    setShowColorButtons(false)
    setPhoto(null)
  }


  const fetchColors = async () => {
    const result = await ImageColors.getColors(Photo, {
      fallback: '#000000',
      quality: 'low',
      pixelSpacing: 5,
      cache: true,
      headers: {
        authorization: 'Basic 123',
      },
    })



  }



  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.header}>

          <View  >
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Feather name="arrow-left" color="#F6EEE5" size={25} />
              <Text style={styles.btnText}>Go back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer} >
            <TapGestureHandler onGestureEvent={eventHandler} >
              <Animated.View style={[uas]} >
                <ImageViewer selectedImage={Photo} placeholderImageSource={placeholder} />

              </Animated.View>

            </TapGestureHandler>

          </View>


          {showColorButtons ? (

            <View>
              {showCircles ? (



                <View>
                  <View>
                    <View style={styles.circleContainer}>

                      <Circle color={colors.colorOne.value} size={0.4} />
                      <Gap gap={20} />
                      <Circle color={colors.colorTwo.value} size={0.4} />
                      <Gap gap={20} />
                      <Circle color={colors.colorThree.value} size={0.4} s />
                      <Gap gap={20} />
                      <Circle color={colors.colorFour.value} size={0.4} />
                      <Gap gap={20} />


                    </View>
                    <Animated.View  >
                      <Text style={{ fontFamily: "Montserrat_600SemiBold", textTransform: "capitalize", color: colors.colorThree.value }} >Vibrant</Text>
                    </Animated.View>

                    <Animated.View >
                      <Text style={{ fontFamily: "Montserrat_600SemiBold", textTransform: "capitalize" }} >Munsel format : {colors.colorThree.munsellFormat}</Text>
                    </Animated.View>
                  </View>

                  <View style={styles.footer} >
                    <TouchableOpacity onPress={resetApp} style={styles.button} >
                      <Text style={styles.btnText}>Make another test!</Text>
                    </TouchableOpacity>


                  </View>


                </View>) : (<View>

                  <View style={styles.footer} >
                    <TouchableOpacity onPress={startResultAnimation} style={styles.button} >
                      <Text style={styles.btnText}>Get colors 🎨</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footer} >

                    <TouchableOpacity onPress={() => {
                      setShowColorButtons(false)
                      setPhoto(null)
                    }} style={styles.button} >
                      <Text style={styles.btnText}>Nop!</Text>
                    </TouchableOpacity>

                  </View>

                </View>)}

            </View>



          ) : (
            <View>



              <View style={styles.footer} >
                <TouchableOpacity onPress={TakePhotoAsync} style={styles.button} >
                  <Text style={styles.btnText}>Take a photo</Text>
                </TouchableOpacity>

              </View>
              <View style={styles.footer} >

                <TouchableOpacity onPress={LoadPhotoAsync} style={styles.button} >
                  <Text style={styles.btnText}>Choose a photo</Text>
                </TouchableOpacity>

              </View>

            </View>
          )}









        </View>


      </ImageBackground>

    </>
  );
}

const Circle = ({ color, size }) => {






  return (

    <TouchableOpacity>

      <View style={{
        backgroundColor: color,
        width: 100 * size,
        height: 100 * size,
        borderRadius: 50 * size,
      }} />



    </TouchableOpacity>


  )

}
const Gap = ({ gap }) => {
  return <View style={{ width: gap }} />
}
const styles = StyleSheet.create({

  circleContainer: {
    flex: 1,
    flexDirection: "row"

  },

  footer: {
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  background: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: '#ff9800',
    alignItems: 'center',
    padding: 20,
    opacity: 0.9,


    borderRadius: 30,

  },
  imgContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'

  },

  header: {
    flex: 1,
    padding: 50,
    zIndex: 1,
  },

  title: {
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
  },
  welcome: {
    marginTop: 20,
    backgroundColor: "#F6EEE5",
    borderRadius: 20,
    padding: 15,
    opacity: 0.9,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
  },

  try: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  btn: {



    padding: 10,


  },
  btnText: {
    color: "#F6EEE5",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 17,
  },
});
