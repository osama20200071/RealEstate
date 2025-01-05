import { Text, ScrollView, TouchableOpacity } from "react-native";
import { categories } from "@/constants/data";
import { memo, useEffect, useRef } from "react";

type FiltersProps = {
  selectedCategory: string;
  updateFilter: (filter: string) => void;
};

const Filters = memo(({ updateFilter, selectedCategory }: FiltersProps) => {
  // const params = useLocalSearchParams<{ filter?: string }>();
  console.log("rendering filters component", selectedCategory);
  // const selectedCategory = category.filter || "";
  const index = categories.findIndex(
    (item) => item.category === selectedCategory
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      updateFilter("All");
      // router.setParams({ filter: "" });
    } else {
      updateFilter(category);
      // router.setParams({ filter: category });
    }
  };

  // Create a ref for the ScrollView
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    // Scroll to the selected category
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * 60, // Estimate position based on index (adjust if needed)
        animated: true,
      });
    }
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectedCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === item.category
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
});

export default Filters;
