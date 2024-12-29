import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/style";

const Button = ({ children, onpress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onpress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text
            style={[styles.buttonText, mode === "flate" && styles.buttonText]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    alignItems: "center",
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
