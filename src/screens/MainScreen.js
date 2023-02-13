import {
  View,
  Text,
  StyleSheet,

  TouchableOpacity,
  
  ImageBackground,

  Pressable
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker'
import ImageViewer from "../utils/ImageViewer";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, color } from 'react-native-reanimated'
import { TapGestureHandler, PanGestureHandler } from "react-native-gesture-handler";
import * as munsell from 'munsell'
const initialState = {
  colorOne: { value: '', name: '', munsellFormat: '', rgbFormat: [] },
  colorTwo: { value: '', name: '', munsellFormat: '', rgbFormat: [] },
  colorThree: { value: '', name: '', munsellFormat: '', rgbFormat: [] },
  colorFour: { value: '', name: '', munsellFormat: '', rgbFormat: [] },
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
      setShowColorButtons(true)
      setPhoto(photo.uri)
      await ImageColors.getColors(photo.uri, {}).then(r => {

        switch (r.platform) {
          case 'android':
          case 'web':
            setColors({
              colorOne: { value: r.lightVibrant, name: 'lightVibrant', munsellFormat: munsell.hexToMunsell(r.lightVibrant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.lightVibrant),) },
              colorTwo: { value: r.dominant, name: 'dominant', munsellFormat: munsell.hexToMunsell(r.dominant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.dominant)) },
              colorThree: { value: r.vibrant, name: 'vibrant', munsellFormat: munsell.hexToMunsell(r.vibrant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.vibrant)) },
              colorFour: { value: r.darkVibrant, name: 'darkVibrant', munsellFormat: munsell.hexToMunsell(r.darkVibrant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.darkVibrant)) },
              rawResult: JSON.stringify(r),
            })
            break
          case 'ios':
            setColors({
              colorOne: { value: r.background, name: 'background', munsellFormat: munsell.hexToMunsell(r.background), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.background),) },
              colorTwo: { value: r.detail, name: 'detail', munsellFormat: munsell.hexToMunsell(r.detail), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.detail)) },
              colorThree: { value: r.primary, name: 'primary', munsellFormat: munsell.hexToMunsell(r.primary), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.primary)) },
              colorFour: { value: r.secondary, name: 'secondary', munsellFormat: munsell.hexToMunsell(r.secondary), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.secondary)) },
              rawResult: JSON.stringify(r),
            })
            break
          default:
            throw new Error('Unexpected platform')
        }
      })


    }).catch(err => { 
      setShowColorButtons(false)
      setPhoto(null)
      alert("Take a photo ! ")
    })


  }
  const LoadPhotoAsync = async () => {
    await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true
    }).then(async photo => {

      setPhoto(photo.uri)
      setShowColorButtons(true)
      await ImageColors.getColors(photo.uri, {}).then(r => {

        switch (r.platform) {
          case 'android':
          case 'web':
            setColors({
              colorOne: { value: r.lightVibrant, name: 'lightVibrant', munsellFormat: munsell.hexToMunsell(r.lightVibrant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.lightVibrant),) },
              colorTwo: { value: r.dominant, name: 'dominant', munsellFormat: munsell.hexToMunsell(r.dominant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.dominant)) },
              colorThree: { value: r.vibrant, name: 'vibrant', munsellFormat: munsell.hexToMunsell(r.vibrant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.vibrant)) },
              colorFour: { value: r.darkVibrant, name: 'darkVibrant', munsellFormat: munsell.hexToMunsell(r.darkVibrant), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.darkVibrant)) },
              rawResult: JSON.stringify(r),
            })
            break
          case 'ios':
            setColors({
              colorOne: { value: r.background, name: 'background', munsellFormat: munsell.hexToMunsell(r.background), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.background),) },
              colorTwo: { value: r.detail, name: 'detail', munsellFormat: munsell.hexToMunsell(r.detail), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.detail)) },
              colorThree: { value: r.primary, name: 'primary', munsellFormat: munsell.hexToMunsell(r.primary), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.primary)) },
              colorFour: { value: r.secondary, name: 'secondary', munsellFormat: munsell.hexToMunsell(r.secondary), rgbFormat: munsell.munsellToRgb255(munsell.hexToMunsell(r.secondary)) },
              rawResult: JSON.stringify(r),
            })
            break
          default:
            throw new Error('Unexpected platform')
        }
      })


    }).catch(err => { 
      setShowColorButtons(false)
      setPhoto(null)
      alert("No photo selected")
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

    setColorName(colors.colorThree.name)
    setHexFormat(colors.colorThree.value)
    setMunsellFormat(colors.colorThree.munsellFormat)
    setRgbFormat(colors.colorThree.rgbFormat)
    setShowCircles(true)
  }
  const resetApp = () => {
    setShowCircles(false)
    setShowColorButtons(false)
    setPhoto(null)
  }

  const [colorName, setColorName] = useState(colors.colorThree.name)
  const [hexFormat, setHexFormat] = useState(colors.colorThree.value)
  const [munsellFormat, setMunsellFormat] = useState(colors.colorThree.munsellFormat)
  const [rgbFormat, setRgbFormat] = useState(colors.colorThree.rgbFormat)


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

                      <Circle color={colors.colorOne.value} size={0.4} onPress={() => {


                        setColorName(colors.colorOne.name)
                        setHexFormat(colors.colorOne.value)
                        setMunsellFormat(colors.colorOne.munsellFormat)
                        setRgbFormat(colors.colorOne.rgbFormat)

                      }

                      } />
                      <Gap gap={20} />
                      <Circle color={colors.colorTwo.value} size={0.4} onPress={() => {

                        setColorName(colors.colorTwo.name)
                        setHexFormat(colors.colorTwo.value)
                        setMunsellFormat(colors.colorTwo.munsellFormat)
                        setRgbFormat(colors.colorTwo.rgbFormat)

                      }} />
                      <Gap gap={20} />
                      <Circle color={colors.colorThree.value} size={0.4} onPress={() => {

                        setColorName(colors.colorThree.name)
                        setHexFormat(colors.colorThree.value)
                        setMunsellFormat(colors.colorThree.munsellFormat)
                        setRgbFormat(colors.colorThree.rgbFormat)

                      }} />
                      <Gap gap={20} />
                      <Circle color={colors.colorFour.value} size={0.4} onPress={() => {


                        setColorName(colors.colorFour.name)
                        setHexFormat(colors.colorFour.value)
                        setMunsellFormat(colors.colorFour.munsellFormat)
                        setRgbFormat(colors.colorFour.rgbFormat)


                      }} />
                      <Gap gap={20} />


                    </View>
                    <ColorDetails colorName={colorName} hexFormat={hexFormat} munsellFormat={munsellFormat} rgbFormat={rgbFormat} />

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


const ColorDetails = ({ colorName, hexFormat, rgbFormat, munsellFormat }) => {
  const startingPosition = -45
  const x = useSharedValue(0)
  const y = useSharedValue(startingPosition)
  const pressed = useSharedValue(false)

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true
    },
    onActive: (event, ctx) => {
      x.value = 0 + event.translationX
      y.value = startingPosition + event.translationY
    },
    onEnd: (event, ctx) => {
      pressed.value = false
      x.value = withSpring(0)
      y.value = withSpring(startingPosition)
    }
  })
  const AnimatedText = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }, { translateX: x.value }]
    }
  })
  return (
    <TouchableOpacity>

      <PanGestureHandler onGestureEvent={eventHandler} >


        <Animated.View style={[AnimatedText]}>
          <Animated.View style={{ paddingBottom: 10 }}  >
            <Text style={{ fontFamily: "Montserrat_600SemiBold", textTransform: "capitalize", color: hexFormat, fontSize: 25 }} >{colorName} : </Text>
          </Animated.View>

          <Animated.View >
            <Text style={{ fontFamily: "Montserrat_600SemiBold", textTransform: "capitalize", color: "#F6EEE5" }} >Munsell Format : {munsellFormat}</Text>
          </Animated.View>
          <Animated.View >
            <Text style={{ fontFamily: "Montserrat_600SemiBold", textTransform: "capitalize", color: "#F6EEE5" }} >Hex Format : {hexFormat}</Text>
          </Animated.View>
          <Animated.View >
            <Text style={{ fontFamily: "Montserrat_600SemiBold", textTransform: "capitalize", color: "#F6EEE5" }} >RGB Format : {JSON.stringify(rgbFormat)}</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

    </TouchableOpacity>

  )

}
const Circle = ({ color, size, onPress }) => {
  const startingPosition = -100
  const x = useSharedValue(0)
  const y = useSharedValue(startingPosition)
  const pressed = useSharedValue(false)
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true
    },
    onActive: (event, ctx) => {
      x.value = 0 + event.translationX
      y.value = startingPosition + event.translationY
    },
    onEnd: (event, ctx) => {
      pressed.value = false
      x.value = withSpring(0)
      y.value = withSpring(startingPosition)
    }
  })
  const circleAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }, { translateX: x.value }]
    }
  })



  return (
    <TouchableOpacity  >
      <PanGestureHandler onFailed={onPress} onGestureEvent={eventHandler} >


        <Animated.View  style={[{
          backgroundColor: color,
          width: 100 * size,
          height: 100 * size,
          borderRadius: 50 * size,
        }, circleAnimated]} />




      </PanGestureHandler>
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
