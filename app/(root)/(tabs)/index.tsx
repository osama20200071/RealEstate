import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <FlatList
      data={properties}
      ListEmptyComponent={
        loading ? (
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
              {latestPropertiesLoading && (
                <ActivityIndicator
                  size={"large"}
                  className="text-primary-300"
                />
              )}
              {(!latestProperties || latestProperties.length === 0) && (
                <NoResults />
              )}
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-4"
              />
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
      }}
    />
  );
};

export default HomeScreen;
