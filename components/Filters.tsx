import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter: string }>();
  const flatListRef = useRef<FlatList>(null);
  const selectedCategory = params.filter || "All";

  let index = categories.findIndex(
    (item) => item.category === selectedCategory
  );
  if (index === -1) {
    index = 0;
  }

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      router.setParams({ filter: "All" });
    } else {
      router.setParams({ filter: category });
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    length: 100, // Estimated or fixed item width
    offset: 100 * index, // Same as item width
    index,
  });

  useEffect(() => {
    if (index >= 0 && index < categories.length) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the item
      });
    }
  }, [selectedCategory]);

  return (
    <FlatList
      ref={flatListRef}
      initialScrollIndex={index} // Ensure this index is valid
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
      data={categories}
      keyExtractor={(item) => item.title}
      getItemLayout={getItemLayout}
      renderItem={({ item, index }) => (
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
