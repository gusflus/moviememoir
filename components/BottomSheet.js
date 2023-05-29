import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

const BottomSheet = ({ children, height = 250, isOpen, close }) => {
  const translateY = useRef(new Animated.Value(isOpen ? 0 : height)).current;

  useEffect(() => {
    toggle();
  }, [isOpen]);

  const toggle = () => {
    Animated.timing(translateY, {
      toValue: isOpen ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <TouchableOpacity
        onPress={close}
        style={[
          isOpen ? { width: "100%", height: "100%" } : null,
          {
            backgroundColor: "rgba(0, 0, 0, 0.33)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.container,
          { height: height, transform: [{ translateY: translateY }] },
        ]}
      >
        <View style={styles.children}>{children}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  children: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-start",
  },
});

export default BottomSheet;
