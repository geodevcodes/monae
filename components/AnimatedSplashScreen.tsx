import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { View } from "react-native";

const AnimatedSplashScreen = () => {
  const animation = useRef<LottieView>(null);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#070933",
      }}
    >
      <LottieView
        autoPlay
        ref={animation}
        onAnimationFinish={() => console.log("Finished")}
        onAnimationLoop={() => console.log("Loops")}
        style={{
          width: "80%",
          height: 200,
          maxWidth: 400,
          //   backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/lottie/netflix.json")}
      />
    </View>
  );
};

export default AnimatedSplashScreen;
