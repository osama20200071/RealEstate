import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

type FeaturedCardType = {
  title: string;
  location: string;
  price: string;
  rating: number;
  image: ImageSourcePropType;
  category: string;
};

type FeaturedCardProps = {
  className?: string;
  onPress?: () => void;
  card: FeaturedCardType;
};

export const FeaturedCard = ({ card, onPress }: FeaturedCardProps) => {
  return (
    <TouchableOpacity
      className="mt-4 w-60 h-80 relative "
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Image source={card.image} className="size-full rounded-2xl" />
      {/* to add a blury overlay for the image */}
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" resizeMode="cover" />
        <Text className="text-xs font-rubik-bold text-primary-300 ">
          {card.rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {card?.name || "Merialla Villa"}
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          {card?.address || "New York, US"}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${card.price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ card, onPress }: FeaturedCardProps) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-300/100 relative"
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View className="flex flex-row items-center gap-1 absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-3" />
        <Text className="text-xs font-rubik-bold text-primary-300 ">
          {card?.rating || 3.4}
        </Text>
      </View>

      <Image source={card.image} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          {card?.name || "name"}
        </Text>
        <Text className="text-xs font-rubik text-black-100">
          {card?.address || "Address"}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${card.price}
          </Text>
          <Image
            source={icons.heart}
            className="size-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
