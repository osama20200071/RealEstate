import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";

import { useProperties } from "@/lib/react-query/queries";
import { useMemo } from "react";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: properties, isLoading } = useProperties({
    filter: params.filter || "All",
    query: params.query!,
    limit: 20,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const ListHeader = useMemo(() => {
    return (
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>

          <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
            Search for Your Ideal Home
          </Text>
          <Image source={icons.bell} className="w-6 h-6" />
        </View>

        <Search />

        <View className="mt-5">
          <Filters />

          <Text className="text-xl font-rubik-bold text-black-300 mt-5">
            Found {properties?.length} Properties
          </Text>
        </View>
      </View>
    );
  }, [params.filter, properties?.length]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  );
};

export default Explore;
