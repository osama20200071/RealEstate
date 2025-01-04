import icons from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { Models } from "react-native-appwrite";

const Comment = ({ item }: { item: Models.Document }) => {
  return (
    <View className="flex gap-3">
      <View className="flex flex-row items-center w-full gap-3">
        <Image source={{ uri: item.avatar }} className="size-14 rounded-full" />
        <Text className="text-base text-black-300 text-start font-rubik-bold ">
          {item.name}
        </Text>
      </View>
      <Text className="text-black-200 text-base font-rubik mt-2">
        {item.review}
      </Text>

      <View className="flex flex-row w-full justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium">120</Text>
        </View>
        <Text className="text-black-100 font-rubik text-sm">
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
