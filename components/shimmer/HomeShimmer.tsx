import { StyleSheet, View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";

export default function HomeShimmer() {
  return (
    <ShimmerProvider duration={1000}>
      <View style={styles.shimmerContainer}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.budgetCard}>
            <Shimmer style={styles.titleShimmer} />

            <View style={styles.progressRow}>
              <View style={styles.progressBackground}>
                <Shimmer style={styles.progressShimmer} />
              </View>
              <Shimmer style={styles.percentShimmer} />
            </View>

            <Shimmer style={styles.usageShimmer} />
          </View>
        ))}
      </View>
    </ShimmerProvider>
  );
}

const styles = StyleSheet.create({
  shimmerContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  budgetCard: {
    width: 260,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#F8FAFE",
    marginRight: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.04,
  },
  titleShimmer: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  progressBackground: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    width: "75%",
    justifyContent: "center",
  },

  progressShimmer: {
    height: 4,
    width: "40%",
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },

  percentShimmer: {
    width: 24,
    height: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginLeft: 10,
  },

  usageShimmer: {
    width: "70%",
    height: 14,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginTop: 12,
  },
});
