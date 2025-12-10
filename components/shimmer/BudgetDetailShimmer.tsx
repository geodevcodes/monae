import { StyleSheet, View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";
import { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BudgetDetailShimmer() {
  return (
    <ShimmerProvider duration={1000}>
      <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
        <View style={styles.headerShimmer}>
          <Shimmer style={styles.headerCircle} easing={Easing.linear} />
          <Shimmer style={styles.headerText} easing={Easing.linear} />
        </View>
        <Shimmer style={styles.budgetCardShimmer} easing={Easing.linear} />
        <View className="justify-center items-center gap-2 my-4">
          <Shimmer style={styles.remainingShimmer} easing={Easing.linear} />
          <Shimmer
            style={styles.remainingLabelShimmer}
            easing={Easing.linear}
          />
        </View>
        <View>
          {[...Array(4)].map((_, i) => (
            <Shimmer
              key={i}
              style={styles.detailRowShimmer}
              easing={Easing.linear}
            />
          ))}
        </View>
      </SafeAreaView>
    </ShimmerProvider>
  );
}

const styles = StyleSheet.create({
  headerShimmer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 12,
  },
  headerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  headerText: {
    width: 200,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  budgetCardShimmer: {
    height: 120,
    borderRadius: 12,
    marginVertical: 20,
    backgroundColor: "#E5E7EB",
  },
  remainingShimmer: {
    width: 120,
    height: 28,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  remainingLabelShimmer: {
    width: 80,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginTop: 4,
  },
  detailRowShimmer: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    marginVertical: 6,
  },
});
