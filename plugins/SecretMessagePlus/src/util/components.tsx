import { React, ReactNative } from "@vendetta/metro/common";
const { useRef, useEffect } = React;
const { StyleSheet, View, Animated, Keyboard, TextInput } = ReactNative;

export default function App({ children, style, ...props }: { children: JSX.Element | JSX.Element[], style?: any }) {
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // 200 duration is somewhat a magic number that seemed to work nicely with
  // the default keyboard opening speed
  const startAnimation = (toValue) =>
    Animated.timing(keyboardOffset, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    // start the animation when the keyboard appears
    Keyboard.addListener("keyboardWillShow", (e) => {
      // use the height of the keyboard (negative because the translateY moves upward)
      startAnimation(-e.endCoordinates?.height);
    });
    // perform the reverse animation back to keyboardOffset initial value: 0
    Keyboard.addListener("keyboardWillHide", () => {
      startAnimation(0);
    });
    return () => {
      // remove listeners to avoid memory leak
      Keyboard.removeAllListeners("keyboardWillShow");
      Keyboard.removeAllListeners("keyboardWillHide");
    };
  }, []);

  return (
    <View>
      <Animated.View style={{ transform: [{ translateY: keyboardOffset }] }}>
        <View style={[style]} {...props}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
// });