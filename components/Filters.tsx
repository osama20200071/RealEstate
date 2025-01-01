import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "House"
  );
  const handleCategoryPress = (category: string) => {
    // clicked the same selected one
    if (category === selectedCategory) {
      setSelectedCategory("All"); // reset
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
      className="mt-3 mb-2"
    >
      {categories.map((item) => (
        <TouchableOpacity
          className={`flex items-start mr-4 px-4 py-1.5  rounded-full ${
            selectedCategory === item.category
              ? "bg-primary-300 "
              : "bg-primary-100 border border-primary-200"
          } `}
          onPress={() => handleCategoryPress(item.category)}
        >
          <Text
            className={`text-sm ${
              selectedCategory === item.category
                ? "text-white font-rubik-medium "
                : "text-black-300 font-rubik"
            } `}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
