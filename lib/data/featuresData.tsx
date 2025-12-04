import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const featuresData = [
  {
    id: "investment_1",
    name: "Investment",
    buttonName: "Get Started",
    description:
      "Open or link your Guaranty Trust Fund Management Account and earn more.",
    icon: <AntDesign name="plus-circle" size={18} color="#ff6600" />,
    imageUrl: require("../../assets/images/investment.jpeg"),
  },
  {
    id: "pension_2",
    name: "Pension",
    buttonName: "Link account",
    description:
      "Link your Guaranty Trust Pension Account and manage your retirement funds.",
    icon: (
      <MaterialIcons name="signal-cellular-0-bar" size={24} color="#ff6600" />
    ),
    imageUrl: require("../../assets/images/pension.jpeg"),
  },
  {
    id: "quickcredit_3",
    name: "Quick Credit",
    buttonName: "Apply Now",
    description: "Instant loans made easy",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={24}
        color="#ff6600"
      />
    ),
    imageUrl: require("../../assets/images/quicklinks.jpeg"),
  },
];
