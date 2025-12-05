import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export const connectedBanksData = [
  {
    id: "zenith_bank_1",
    name: "Zenith Bank",
    spendAmount: "₦103,000",
    accountNumber: "1234009560",
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
    id: "moniepoint_2",
    name: "Monie point",
    spendAmount: "₦60,900",
    accountNumber: "1234009891",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: <Feather name="hash" size={20} color="#A855F7" />,
  },
  {
    id: "uba_3",
    name: "UBA",
    spendAmount: "₦32,750",
    accountNumber: "1234009345",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: <FontAwesome name="institution" size={20} color="#A855F7" />,
  },
  {
    id: "sterling_4",
    name: "Sterling Bank",
    spendAmount: "₦31,320",
    accountNumber: "1234009143",
    bg: "#E0F2FE",
    borderColor: "#BAE6FD",
    icon: <AntDesign name="credit-card" size={20} color="#0284C7" />,
  },
  {
    id: "kuda_mfb_4",
    name: "Kuda MFB",
    spendAmount: "₦31,320",
    accountNumber: "1234009421",
    bg: "#E0F2FE",
    borderColor: "#BAE6FD",
    icon: <Feather name="hash" size={20} color="#A855F7" />,
  },
];
