import { StyleSheet, View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";
import { Easing } from "react-native-reanimated";

export default function ShimmerLoader() {
  return (
    <ShimmerProvider duration={1000}>
      <View style={{ flex: 1, marginTop: 24, backgroundColor: "white" }}>
        <Shimmer style={styles.shimmerMain} easing={Easing.linear} speed={1} />
      </View>
    </ShimmerProvider>
  );
}

const styles = StyleSheet.create({
  shimmerMain: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 24,
    justifyContent: "center",
    gap: 16,
    height: 20,
    width: "100%",
  },
  circle: {
    marginTop: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#0f172a",
  },
});
