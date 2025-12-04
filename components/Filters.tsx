import { beneficiariesFilters } from "@/lib/data/transfersData";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-1.5 mb-2"
    >
      {beneficiariesFilters.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategory(item.category)}
          className={`flex flex-col items-start mr-3 px-4 py-2 rounded-full ${
            selectedCategory === item.category &&
            "bg-[#f1dcce] border-[0.3px] border-[#ff6600]"
          }`}
        >
          <Text
            className={`text-base ${
              selectedCategory === item.category
                ? "text-[#ff6600] font-bold mt-0.5"
                : "font-medium text-gray-600"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
