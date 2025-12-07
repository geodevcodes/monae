import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export const categoriesData = [
  { id: "food", label: "Food", emoji: "🍔" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "transport", label: "Transport", emoji: "🚗" },
  { id: "home", label: "Home & Utilities", emoji: "🏠" },
  { id: "subscriptions", label: "Subscriptions & Bills", emoji: "⚡" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "wellness", label: "Wellness", emoji: "🧘" },
  { id: "entertainment", label: "Entertainment", emoji: "🎉" },
  { id: "financial", label: "Financial & Others", emoji: "💰" },
];

export const durationOptions = ["Daily", "Weekly", "Monthly", "Yearly"];

export const budgetData = [
  {
    id: "food_budget_1",
    name: "Food Budget",
    description: "You've used 60% of your budget",
    progress: 60,
    icon: <AntDesign name="plus-circle" size={18} color="#ff6600" />,
    href: "/(others)/budget-details/food_budget_1",
    bg: "#EDF2FF",
    borderColor: "#5F61F5",
    amountBudgeted: "₦100,000.00",
    expenses: "₦60,000",
    createdAt: "2025-09-01",
    endDate: "Sept 30, 2025 (13 days left)",
  },
  {
    id: "transport_2",
    name: "Transport",
    description: "You've used 75% of your budget",
    progress: 75,
    icon: (
      <MaterialCommunityIcons
        name="chevron-double-right"
        size={24}
        color="#ff6600"
      />
    ),
    href: "/(others)/budget-details/transport_2",
    bg: "#FFF4E5",
    borderColor: "#FFA62F",
    amountBudgeted: "₦80,000.00",
    expenses: "₦60,000",
    createdAt: "2025-09-01",
    endDate: "Oct 12, 2025 (25 days left)",
  },
  {
    id: "home_utilities_3",
    name: "Home & Utilities",
    description: "You've used 95% of your budget",
    progress: 95,
    icon: (
      <MaterialIcons
        name="bar-chart"
        size={24}
        color="#ff6600"
        className="rotate-180"
      />
    ),
    href: "/(others)/budget-details/home_utilities_3",
    bg: "#FFEAF0",
    borderColor: "#F56C8A",
    amountBudgeted: "₦150,000.00",
    expenses: "₦67,500",
    createdAt: "2025-09-01",
    endDate: "Sept 22, 2025 (5 days left)",
  },
  {
    id: "entertainment_4",
    name: "Entertainment",
    description: "You've used 50% of your budget",
    progress: 50,
    icon: <MaterialIcons name="library-music" size={20} color="#ff6600" />,
    href: "/(others)/budget-details/entertainment_4",
    bg: "#EDF2FF",
    borderColor: "#5F61F5",
    amountBudgeted: "₦50,000.00",
    expenses: "₦15,000",
    createdAt: "2025-09-01",
    endDate: "Oct 5, 2025 (18 days left)",
  },
  {
    id: "healthcare_5",
    name: "Healthcare",
    description: "You've used 30% of your budget",
    progress: 30,
    icon: <MaterialIcons name="health-and-safety" size={22} color="#ff6600" />,
    href: "/(others)/budget-details/healthcare_5",
    bg: "#EDF2FF",
    borderColor: "#5F61F5",
    amountBudgeted: "₦120,000.00",
    expenses: "₦60,000",
    createdAt: "2025-09-01",
    endDate: "Nov 1, 2025 (45 days left)",
  },
  {
    id: "education_6",
    name: "Education",
    description: "You've used 80% of your budget",
    progress: 80,
    icon: (
      <MaterialCommunityIcons
        name="book-open-page-variant"
        size={22}
        color="#ff6600"
      />
    ),
    href: "/(others)/budget-details/education_6",
    bg: "#FFEAF0",
    borderColor: "#F56C8A",
    amountBudgeted: "₦200,000.00",
    expenses: "₦40,000",
    createdAt: "2025-09-01",
    endDate: "Sept 28, 2025 (11 days left)",
  },
];
