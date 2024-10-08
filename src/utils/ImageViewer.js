import { StyleSheet, Image } from "react-native";
export default function ImageViewer({placeholderImageSource,selectedImage}) {
    const imageSource = selectedImage !== null
     ? {uri: selectedImage}
     : placeholderImageSource
    return (
        <Image source = {imageSource} style = {styles.img} />    )
}

const styles    = StyleSheet.create ({

 
    img: {
        width: 150,
        height: 150,
        borderRadius: 35
      },
});