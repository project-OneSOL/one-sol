import { StyleSheet, Text, View, TextInput } from "react-native";

export const CustomTextField = ({ placeholder, maxLength, onChangeText, value, isHidden}) => {
    return (
        <View style = {styles.container}>
            <TextInput 
                editable
                maxLength={maxLength}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style = {styles.input}
                secureTextEntry={isHidden}
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
    container: {
        
    }
})