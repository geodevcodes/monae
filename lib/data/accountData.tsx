import { FontAwesome, Foundation, Octicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const accountInformationData = [
  {
    id: "personal_info_1",
    name: "Personal Information",
    description: "Adjust your name, email and others",
    bg: "#4CA30D",
    borderColor: "#FFFFFF",
    icon: <AntDesign name="user" size={20} color="#FFFFFF" />,
  },
  {
    id: "subscription_2",
    name: "Manage Subscription",
    description: "Manage payments and plan details",
    bg: "#0D82A3",
    borderColor: "#FFFFFF",
    icon: <Octicons name="id-badge" size={20} color="#FFFFFF" />,
  },
  {
    id: "personalisation_3",
    name: "Personalisation",
    description: "Set your themes and language",
    bg: "#444CE7",
    borderColor: "#FFFFFF",
    icon: <Foundation name="paint-bucket" size={20} color="#FFFFFF" />,
  },
];

export const securityData = [
  {
    id: "security_settings_1",
    name: "Security Settings",
    description: "Control your account security.",
    bg: "#DC6803",
    borderColor: "#FFFFFF",
    icon: <AntDesign name="security-scan" size={20} color="#FFFFFF" />,
  },
  {
    id: "notification_2",
    name: "Notification",
    description: "Manage alerts your way.",
    bg: "#7F56D9",
    borderColor: "#FFFFFF",
    icon: (
      <MaterialCommunityIcons
        name="bell-badge-outline"
        size={20}
        color="#FFFFFF"
      />
    ),
  },
];

export const othersData = [
  {
    id: "contact_support_1",
    name: "Contact Support",
    description: "Need help? Let's chat.",
    bg: "#4CA30D",
    borderColor: "#FFFFFF",
    icon: <AntDesign name="user" size={20} color="#FFFFFF" />,
  },
  {
    id: "rate_us_2",
    name: "Rate Us",
    description: "We'd love your thoughts.",
    bg: "#1570EF",
    borderColor: "#FFFFFF",
    icon: <Fontisto name="world-o" size={20} color="#FFFFFF" />,
  },
  {
    id: "signout_2",
    name: "Sign Out",
    description: "See you soon.",
    bg: "#E31B54",
    borderColor: "#FFFFFF",
    icon: <FontAwesome name="sign-out" size={20} color="#FFFFFF" />,
  },
];

export const settingsData = [
  {
    section: "Account Information",
    items: [...accountInformationData],
  },
  {
    section: "Security",
    items: [...securityData],
  },
  {
    section: "Others",
    items: [...othersData],
  },
];
