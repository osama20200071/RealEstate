import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { useLatestProperties, useProperties } from "@/lib/react-query/queries";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const handleCardPress = (id: string) => router.push(`/properties/${id}`);

const HomeScreen = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();

  const { data: properties, isLoading } = useProperties({
    limit: 6,
    query: params.query!,
    filter: params.filter || "All",
  });

  const ListHeader = useMemo(() => {
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
              <Text className="text-base font-rubik-medium">{user?.name}</Text>
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
          <FeaturedProperties />
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
        </View>
      </View>
    );
  }, [params.filter, user]);

  return (
    <FlatList
      data={properties}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator size={"large"} className="mt-5 text-primary-300" />
        ) : (
          <NoResults />
        )
      }
      className="px-5"
      renderItem={({ item }) => (
        <Card item={item} onPress={() => handleCardPress(item.$id)} />
      )}
      keyExtractor={(item) => item.$id}
      columnWrapperClassName="flex gap-4"
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-16"
      ListHeaderComponent={ListHeader}
    />
  );
};

export default HomeScreen;

const FeaturedProperties = () => {
  const { data: latestProperties, isLoading } = useLatestProperties();

  return (
    <FlatList
      data={latestProperties}
      renderItem={({ item }) => (
        <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
      )}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator
            size={"large"}
            className="mt-5 ml-5 text-primary-300"
          />
        ) : (
          <NoResults />
        )
      }
      keyExtractor={(item) => item.$id}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex gap-4 "
    />
  );
};
