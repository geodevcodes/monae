import images from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const productsData = [
  {
    id: "loan_1",
    name: "Loan",
    buttonName: "Apply for loan",
    description: "Click here to apply for Quick Credit and Salary Advance.",
    icon: <AntDesign name="plus-circle" size={18} color="#ff6600" />,
    iconRight: false,
    imageUrl: images.loan,
  },
  {
    id: "gtfund_2",
    name: "GT Fund Managers Money Market Fund",
    buttonName: null,
    description:
      "Our money market fund is a perfect way to start your investment journey.",
    icon: (
      <MaterialIcons name="signal-cellular-0-bar" size={24} color="#ff6600" />
    ),
    iconRight: true,
    imageUrl: images.gtfund,
  },
  {
    id: "gtdollarfund_3",
    name: "GT Fund Managers Dollar Fund",
    buttonName: null,
    description:
      "Best the curve and make the most of your money. Invest in our Dollar fund.",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={24}
        color="#ff6600"
      />
    ),
    iconRight: true,
    imageUrl: images.gtdollarfund,
  },
  {
    id: "gtrsa_4",
    name: "GT Pension Managers RSA",
    buttonName: null,
    description:
      "As you move up in your career, the amount you build in your RSA will be ready for you when you retire.",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={24}
        color="#ff6600"
      />
    ),
    iconRight: true,
    imageUrl: images.gtdollarfund,
  },
  {
    id: "gtcontribution_5",
    name: "GT Pension Managers 25% Contribution After Job Loss",
    buttonName: null,
    description:
      "Access 25% of your RSA Balance to provide financial relief after at least 4 months of job loss.",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={24}
        color="#ff6600"
      />
    ),
    iconRight: true,
    imageUrl: images.gtcontribution,
  },
  {
    id: "gtresidential_6",
    name: "GT Pension Managers Equity Contribution for Residential Mortgage",
    buttonName: null,
    description:
      "Access 25% of your RSA Balance as an equity contribution towards a residential mortgage.",
    icon: (
      <MaterialCommunityIcons
        name="wifi-strength-4"
        size={24}
        color="#ff6600"
      />
    ),
    iconRight: true,
    imageUrl: images.gtresidential,
  },
];
