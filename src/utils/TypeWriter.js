import React, {useState, useEffect, useRef} from 'react'
import {View,Text} from 'react-native'

const TypeWriter = ({text, styleView, styleText, dev}) => { 
    const index = useRef(0);
    const [currentText, setCurrentText] = useState("")
    useEffect(()=> {
        index.current = 0
        setCurrentText('')
        
    }, [text])
    useEffect(()=> {
        const timeoutId = setTimeout(()=> {
            setCurrentText((value) => value + text.charAt(index.current))
            index.current ++;
        }, 20 )


        
        return () => {
            clearTimeout(timeoutId)
 
        }
         
    }, [currentText,text])
    return (
        dev ? (
            <View style = {styleView}>
            <Text style = {styleText}>{text}</Text>
        </View>
        ) : (
            <View style = {styleView}>
            <Text style = {styleText}>{currentText}</Text>
        </View>
        )
       
    )
}
export default TypeWriter