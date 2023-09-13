import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { palette } from "../lib/styles/colorPalette";

export const CustomTextField = ({ placeholder, maxLength, onChangeText, value, isHidden}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setIsFocused(false);
    }
    const inputStyles = [
        styles.input,
        isFocused ? styles.focusedInput : null,
    ]

    return (
        <View style = {styles.container}>
            <TextInput 
                editable
                maxLength={maxLength}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style = {inputStyles}
                secureTextEntry={isHidden}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        width: "100%",
        borderBottomWidth: 1,
        padding:10
    },
    focusedInput: {
        backgroundColor: "white",
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: palette.blue,
        padding:10
    },
    container: {
        
    }
})