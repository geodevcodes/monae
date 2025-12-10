import { FlatList, StyleSheet, View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BudgetShimmer() {
  return (
    <ShimmerProvider duration={1000}>
      <SafeAreaView style={styles.container}>
        {/* Overall Budgets Card */}
        <View style={styles.overallCard}>
          <View style={styles.row}>
            <Shimmer style={styles.textShimmer} />
            <Shimmer style={styles.textShimmer} />
          </View>

          <View style={[styles.row, { marginTop: 8 }]}>
            <View style={styles.progressBackground}>
              <Shimmer style={styles.progressShimmer} />
            </View>
            <Shimmer style={[styles.textShimmer, { width: 40, height: 16 }]} />
          </View>

          <Shimmer
            style={[styles.textShimmer, { marginTop: 4, width: "60%" }]}
          />

          <View style={[styles.row, { marginTop: 8 }]}>
            <Shimmer style={[styles.textShimmer, { width: 80 }]} />
            <Shimmer style={[styles.textShimmer, { width: 60 }]} />
          </View>
        </View>

        {/* Individual Budget Cards */}
        <FlatList
          data={[...Array(5)]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => (
            <View style={styles.budgetCard}>
              <View style={styles.row}>
                <Shimmer style={[styles.textShimmer, { width: 100 }]} />
                <Shimmer style={[styles.textShimmer, { width: 60 }]} />
              </View>

              <View style={[styles.row, { marginTop: 8 }]}>
                <View style={styles.progressBackground}>
                  <Shimmer style={[styles.progressShimmer, { width: "60%" }]} />
                </View>
                <Shimmer
                  style={[styles.textShimmer, { width: 40, height: 16 }]}
                />
              </View>

              <Shimmer
                style={[styles.textShimmer, { marginTop: 4, width: "50%" }]}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </ShimmerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  overallCard: {
    backgroundColor: "#EDF2FF",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  budgetCard: {
    backgroundColor: "#F8FAFE",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textShimmer: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  progressBackground: {
    flex: 1,
    backgroundColor: "#F7FAFE",
    height: 8,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
  },
  progressShimmer: {
    width: "40%",
    height: 4,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
});
