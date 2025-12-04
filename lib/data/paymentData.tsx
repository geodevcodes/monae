import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export const paymentData = [
  {
    id: "buy_airtime_1",
    name: "Buy airtime",
    description:
      "Enter receiver's name or phone number to buy airtime instantly.",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: (
      <MaterialIcons name="signal-cellular-0-bar" size={20} color="#A855F7" />
    ),
  },
  {
    id: "buy_data_2",
    name: "Buy data",
    description: "Enter receiver's name or phone number to buy data instantly.",
    bg: "#E0F2FE",
    borderColor: "#BAE6FD",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={20}
        color="#0284C7"
      />
    ),
  },
  {
    id: "book_flight_3",
    name: "Airlines, Travels & Transportation/Logistics",
    description: "",
    bg: "#DCFCE7",
    borderColor: "#BBF7D0",
    icon: <Entypo name="aircraft-take-off" size={20} color="#16A34A" />,
  },
  {
    id: "cable_tv_4",
    name: "Cable TV",
    description: "",
    bg: "#CCFBF1",
    borderColor: "#99F6E4",
    icon: <MaterialIcons name="live-tv" size={20} color="#0D9488" />,
  },
  {
    id: "capital_market_5",
    name: "Capital Market & Investments",
    description: "",
    bg: "#FEF9C3",
    borderColor: "#FEF08A",
    icon: <Feather name="trending-up" size={20} color="#CA8A04" />,
  },
  {
    id: "distributor_agent_6",
    name: "Distributors & Agent Payments",
    description: "",
    bg: "#FFE4E6",
    borderColor: "#FECDD3",
    icon: <SimpleLineIcons name="bag" size={20} color="#E11D48" />,
  },
  {
    id: "electricity_water_7",
    name: "Electricity & Water",
    description: "",
    bg: "#E0F2FE",
    borderColor: "#BAE6FD",
    icon: <MaterialCommunityIcons name="water" size={20} color="#0284C7" />,
  },
  {
    id: "entertainment_evoucher_8",
    name: "Entertainment & E-Vouchers",
    description: "",
    bg: "#F5F3FF",
    borderColor: "#E9D5FF",
    icon: <MaterialIcons name="bookmark" size={20} color="#7C3AED" />,
  },
  {
    id: "estates_associations_9",
    name: "Estates & Associations",
    description: "",
    bg: "#E0EAFF",
    borderColor: "#C7D2FE",
    icon: <MaterialIcons name="real-estate-agent" size={20} color="#6366F1" />,
  },
  {
    id: "financial_institutions_10",
    name: "Financial Institutions",
    description: "",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: <FontAwesome name="institution" size={20} color="#A855F7" />,
  },
  {
    id: "government_taxes_11",
    name: "Government Taxes and Levels",
    description: "",
    bg: "#FDE68A",
    borderColor: "#FCD34D",
    icon: <FontAwesome6 name="sheet-plastic" size={20} color="#CA8A04" />,
  },
  {
    id: "infotechs_other_services_12",
    name: "Infotechs & Other Services",
    description: "",
    bg: "#E5E7EB",
    borderColor: "#D1D5DB",
    icon: <Entypo name="dots-three-horizontal" size={20} color="#6B7280" />,
  },
  {
    id: "insurance_hmo_13",
    name: "Insurance & HMO",
    description: "",
    bg: "#DCFCE7",
    borderColor: "#BBF7D0",
    icon: <MaterialIcons name="security" size={20} color="#16A34A" />,
  },
  {
    id: "internet_subscription_14",
    name: "Internet Subscription",
    description: "",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: <FontAwesome6 name="internet-explorer" size={20} color="#9333EA" />,
  },
  {
    id: "nibssebills_pay_15",
    name: "NIBSSEBILLSPAY",
    description: "",
    bg: "#FEF3C7",
    borderColor: "#FDE68A",
    icon: <FontAwesome6 name="hornbill" size={20} color="#D97706" />,
  },
  {
    id: "paydirect_16",
    name: "PAYDIRECT",
    description: "",
    bg: "#ECFCCB",
    borderColor: "#D9F99D",
    icon: <Octicons name="file-directory-symlink" size={20} color="#65A30D" />,
  },
  {
    id: "religious_institutions_ngo_17",
    name: "Religious Institutions & NGO",
    description: "",
    bg: "#FFE4E6",
    borderColor: "#FECDD3",
    icon: <MaterialCommunityIcons name="church" size={20} color="#E11D48" />,
  },
  {
    id: "remita_18",
    name: "Remita",
    description: "",
    bg: "#FEE2E2",
    borderColor: "#FCA5A5",
    icon: <AntDesign name="trademark" size={20} color="#DC2626" />,
  },
  {
    id: "schools_professional_bodies_19",
    name: "Schools & Professional Bodies",
    description: "",
    bg: "#FCE7F3",
    borderColor: "#FBCFE8",
    icon: <MaterialIcons name="school" size={20} color="#DB2777" />,
  },
  {
    id: "shipping_line_payment_20",
    name: "Shipping Line Payment",
    description: "",
    bg: "#F3F4F6",
    borderColor: "#E5E7EB",
    icon: <MaterialCommunityIcons name="book" size={20} color="#6B7280" />,
  },
  {
    id: "sports_gaming_21",
    name: "Sports and Gaming",
    description: "",
    bg: "#DCFCE7",
    borderColor: "#BBF7D0",
    icon: (
      <MaterialCommunityIcons name="tennis-ball" size={20} color="#16A34A" />
    ),
  },
  {
    id: "toll_fees_lcc_22",
    name: "Toll Fees - LCC",
    bg: "#FFE4E6",
    borderColor: "#FECDD3",
    icon: <FontAwesome6 name="car-rear" size={20} color="#E11D48" />,
  },
  {
    id: "utilities_23",
    name: "Utilities",
    bg: "#FEF3C7",
    borderColor: "#FDE68A",
    icon: <MaterialIcons name="pentagon" size={20} color="#D97706" />,
  },
  {
    id: "visa_fee_payment_24",
    name: "VISA Fee Payment",
    bg: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: (
      <MaterialCommunityIcons name="content-copy" size={20} color="#A855F7" />
    ),
  },
];
