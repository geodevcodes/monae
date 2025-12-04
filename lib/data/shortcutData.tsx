import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const shortcutData = [
  {
    id: "nearme_1",
    name: "Near me",
    bg: "#FEE2E2",
    borderColor: "#FCA5A5",
    icon: <FontAwesome6 name="location-crosshairs" size={24} color="#DC2626" />,
    href: "",
  },
  {
    id: "by_airtime_1",
    name: "Buy airtime",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: (
      <MaterialIcons name="signal-cellular-0-bar" size={24} color="#A855F7" />
    ),
    href: "/(others)/payments-details/buy_airtime_1",
  },
  {
    id: "buy_data_2",
    name: "Buy data",
    bg: "#E0F2FE",
    borderColor: "#BAE6FD",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={24}
        color="#0284C7"
      />
    ),
    href: "/(others)/payments-details/buy_data_2",
  },
  {
    id: "fxsales_4",
    name: "FX Sales",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: (
      <MaterialCommunityIcons
        name="rotate-3d-variant"
        size={24}
        color="#A855F7"
      />
    ),
    href: "",
  },
];
