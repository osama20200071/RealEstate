import { Card, FeaturedCard } from "@/components/Cards";
// import Filters from "@/components/Filters2";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import { featuredCards } from "@/constants/data";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const { user } = useGlobalContext();
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      className="px-5"
      renderItem={(item) => <Card card={featuredCards[1]} />}
      keyExtractor={(item) => item.toString()}
      columnWrapperClassName="flex gap-4"
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-16"
      ListHeaderComponent={() => {
        return (
          <View>
            <View className="flex flex-row items-center justify-between pt-5">
              <View className="flex flex-row   gap-2">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start justify-center">
                  <Text className="text-xs  font-rubik text-black-100 ">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search className="mt-5" />
            {/* featured section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-base text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={() => <FeaturedCard card={featuredCards[0]} />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-4"
              />
              {/* <View className="flex flex-row items-center gap-3 mt-3">
                <FeaturedCard card={featuredCards[0]} />
                <FeaturedCard card={featuredCards[1]} />
              </View> */}
            </View>

            {/* recommendation section */}
            <View className="mt-5 mb-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-base text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />

              {/* <View className="flex flex-row flex-wrap items-center gap-5 mt-5">
                <Card card={featuredCards[0]} />
                <Card card={featuredCards[1]} />
              </View> */}
            </View>
          </View>
        );
      }}
    />
  );
};

export default HomeScreen;
