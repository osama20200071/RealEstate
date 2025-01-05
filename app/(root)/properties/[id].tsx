import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useSpecificProperty } from "@/lib/react-query/queries";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
  FlatList,
} from "react-native";
import { Models } from "react-native-appwrite";

const Property = () => {
  const { id } = useLocalSearchParams();
  const { data: property, isLoading } = useSpecificProperty({
    id: id as string,
  });

  if (isLoading) {
    return <ActivityIndicator size={"large"} className="mt-56" />;
  }

  const screenHight = Dimensions.get("screen").height;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View
          className="relative w-full h-96"
          style={{ height: screenHight / 2 }}
        >
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="size-full absolute top-0"
          />

          <View className="absolute top-12 inset-x-7 flex flex-row justify-between items-center z-50">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row bg-primary-100 rounded-full size-11 items-center justify-center"
            >
              <Image source={icons.backArrow} className="size-6" />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-3">
              <Image
                source={icons.heart}
                className="size-7"
                tintColor={"#191D31"}
              />
              <Image source={icons.send} className="size-7" />
            </View>
          </View>
        </View>
        <View className="px-5">
          {/* Property details */}
          <View className="flex gap-2 mt-7 items-start">
            <Text className="text-2xl font-rubik-extrabold">
              {property?.name}
            </Text>

            <View className="flex flex-row gap-2 items-center ">
              <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
                <Text className="text-xs font-rubik-bold text-primary-300">
                  {property?.type.toUpperCase()}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Image source={icons.star} className="size-5" />
                <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                  {property?.rating} ({property?.reviews.length} reviews)
                </Text>
              </View>
            </View>
          </View>

          {/*  beds , rooms , area */}
          <View className="flex flex-row items-center justify-between  mt-5">
            <PropertyFeature
              value={property?.bedrooms}
              icon={icons.bed}
              title="Beds"
            />
            <PropertyFeature
              value={property?.bathrooms}
              icon={icons.bath}
              title="Baths"
            />
            <PropertyFeature
              value={property?.area}
              icon={icons.area}
              title="Sqft"
            />
          </View>

          {/* line separator */}
          <View className="w-full bg-primary-100 h-0.5 my-8"></View>

          {/* wrapper for equally vertical space with gap-8 ~ 30px  */}
          <View className="flex gap-12">
            {/* Agent */}
            <View className="flex items-start gap-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Agent
              </Text>
              <View className="flex flex-row items-center justify-between w-full">
                <View className="flex flex-row items-center gap-5">
                  <Image
                    source={{ uri: property?.agent?.avatar }}
                    className="size-16 rounded-full"
                  />
                  <View className="flex flex-col">
                    <Text className="text-lg font-rubik-bold">
                      {property?.agent?.name}
                    </Text>
                    <Text className="text-black-200 text-sm font-rubik-medium">
                      {property?.agent?.email}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row gap-5">
                  <TouchableOpacity>
                    <Image source={icons.chat} className="size-8" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={icons.phone} className="size-8" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* overview */}
            <View className="flex flex-col gap-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Overview
              </Text>
              <Text className="text-black-200 text-sm font-rubik-medium">
                {property?.description}
              </Text>
            </View>

            {/* Facilities */}
            <View className="flex gap-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Facilities
              </Text>
              <Facilities propertyFacilities={property?.facilities} />
            </View>

            {/* Galleries */}
            <View className="flex gap-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Gallery
              </Text>
              <Gallery galleries={property?.gallery} />
            </View>

            {/* Location */}
            <View className="flex gap-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Location
              </Text>
              <View className="flex flex-row items-center justify-start gap-2">
                <Image source={icons.location} className="w-7 h-7" />
                <Text className="text-black-200 text-sm font-rubik-medium">
                  {property?.address}
                </Text>
              </View>
              <Image source={images.map} className="w-full h-56 rounded-xl" />
            </View>

            {/* Reviews */}
            <Reviews property={property!} />
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-3xl border-t border-r border-l border-primary-200 px-7 py-4">
        <View className="flex flex-row w-full gap-8 items-center">
          <View className="flex items-start gap-2">
            <Text className="text-black-200 text-sm font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-800">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Property;

const PropertyFeature = ({
  icon,
  value,
  title,
}: {
  icon: ImageSourcePropType;
  value: number;
  title: string;
}) => {
  return (
    <View className="flex flex-row items-center gap-2">
      <TouchableOpacity className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
        <Image source={icon} className="size-5" />
      </TouchableOpacity>
      <Text className="text-black-300 text-sm font-rubik-medium">
        {value} {title}
      </Text>
    </View>
  );
};

const Facilities = ({
  propertyFacilities,
}: {
  propertyFacilities: string[];
}) => {
  if (propertyFacilities.length === 0) {
    return null;
  }

  return (
    <View className="flex flex-row flex-wrap items-start justify-start  gap-5">
      {propertyFacilities.map((item: string, index: number) => {
        const facility = facilities.find((facility) => facility.title === item);

        return (
          <View
            key={index}
            className="flex flex-1 flex-col items-center min-w-16 max-w-20"
          >
            <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
              <Image
                source={facility ? facility.icon : icons.info}
                className="size-6"
              />
            </View>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-black-300 text-sm text-center font-rubik mt-1.5"
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const Gallery = ({ galleries }: { galleries: Models.Document[] }) => {
  if (galleries.length === 0) {
    return null;
  }
  return (
    <FlatList
      contentContainerStyle={{ paddingRight: 20 }}
      data={galleries}
      keyExtractor={(item) => item?.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item?.image }} className="size-40 rounded-xl" />
      )}
      contentContainerClassName="flex gap-4 mt-3"
    />
  );
};

const Reviews = ({ property }: { property: Models.Document }) => {
  if (property.reviews.length === 0) {
    return null;
  }

  return (
    <View className="flex gap-5">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-2">
          <Image source={icons.star} className="size-5" />
          <Text className="text-black-300 text-xl font-rubik-bold">
            {property?.rating} ({property?.reviews.length} reviews)
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="text-base font-rubik-bold text-primary-300">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="border rounded-lg border-primary-200 p-3">
        <Comment item={property?.reviews[0]} />
      </View>
    </View>
  );
};
