import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );
  const handleSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <View className="flex flex-row items-center justify-between w-full px-4 border border-gray-200 rounded-xl bg-white h-14">
      <View className="flex-1 flex flex-row items-center justify-start">
        <Image
          source={icons.search}
          className="text-[#808080] w-[15.63px] h-[15.78px]"
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder={placeholder}
          style={{ paddingVertical: 0 }}
          className="text-sm font-rubik placeholder:text-gray-400 ml-2 flex-1 "
        />
      </View>
    </View>
  );
};

export default Search;
