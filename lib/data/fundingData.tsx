import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export const fundingData = [
  {
    id: "account_1",
    name: "My GTBank account",
    bg: "#FEE2E2",
    borderColor: "#FCA5A5",
    icon: (
      <Ionicons
        name="chevron-expand-outline"
        size={20}
        color="#DC2626"
        style={{ transform: [{ rotate: "90deg" }] }}
      />
    ),
  },
  {
    id: "ussd_2",
    name: "USSD",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: <Feather name="hash" size={20} color="#A855F7" />,
  },
  {
    id: "another_bank_3",
    name: "Another bank",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: <FontAwesome name="institution" size={20} color="#A855F7" />,
  },
  {
    id: "card_4",
    name: "Debit or credit card",
    bg: "#E0F2FE",
    borderColor: "#BAE6FD",
    icon: <AntDesign name="credit-card" size={20} color="#0284C7" />,
  },
];
