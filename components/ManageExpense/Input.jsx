import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/style";

const Input = ({label, containerStyle, textInputConfiguratin, inValid}) => {

    const inputStyle = [styles.input]
    if(textInputConfiguratin && textInputConfiguratin?.multiline){
        inputStyle.push(styles.inputMultiLine)
    }

    if(inValid){
        inputStyle.push(styles.inValidBackground);
    }

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.label, inValid && styles.inValidLable]}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfiguratin} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary200, 
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6, 
        fontSize: 18,
    },
    inputMultiLine: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    inValidLable: {
        color: GlobalStyles.colors.error500
    },
    inValidBackground: {
        backgroundColor: GlobalStyles.colors.error50,
    }
});
