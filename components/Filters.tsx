import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter: string }>();
  const selectedCategory = params.filter || "All";
  const scrollViewRef = useRef<FlatList>(null);

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      router.setParams({ filter: "All" });
    } else {
      router.setParams({ filter: category });
    }
  };

  useEffect(() => {
    // Scroll to the start of the list
    if (scrollViewRef.current && selectedCategory === "All") {
      scrollViewRef.current.scrollToIndex({ index: 0 });
    }
  }, [selectedCategory]);

  return (
    <FlatList
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
      data={categories}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={`flex items-start mr-4 px-4 py-1.5 rounded-full ${
            item.category === selectedCategory
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
          onPress={() => handleCategoryPress(item.category)}
        >
          <Text
            className={`text-sm ${
              item.category === selectedCategory
                ? "text-white font-rubik-medium"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filters;
