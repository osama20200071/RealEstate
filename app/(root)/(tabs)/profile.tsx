import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  // console.log(JSON.stringify(user, null, 2));
  const handleLogout = async () => {
    try {
      const result = await logout();
      refetch();
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-8 px-7"
      // stickyHeaderIndices={[0]}
    >
      <View className="flex flex-row items-center justify-between pt-5 bg-white">
        <Text className="text-xl font-rubik-bold">Profile</Text>
        <Image source={icons.bell} className="size-6" />
      </View>

      <View className="flex items-center gap-3 border-b border-primary-200 pb-10 ">
        <View className="flex flex-col items-center relative mt-5">
          <Image
            source={{ uri: user?.avatar }}
            className="size-44 rounded-full relative"
          />
          <TouchableOpacity
            className="absolute bottom-10 right-2"
            activeOpacity={0.7}
          >
            <Image source={icons.edit} className="size-9 opacity-80" />
          </TouchableOpacity>
          <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
        </View>
      </View>

      <View className="flex flex-col mt-10">
        <SettingsItem title="My Bookings" icon={icons.calendar} />
        <SettingsItem icon={icons.wallet} title="Payments" />
      </View>

      <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
        {settings.slice(2).map((item, index) => (
          <SettingsItem key={index} {...item} />
        ))}
      </View>

      <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
        <SettingsItem
          icon={icons.logout}
          title="Logout"
          textStyle="text-danger"
          showArrow={false}
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

type SettingsItemProps = {
  // icon: any;
  icon: ImageSourcePropType;
  title: string;
  textStyle?: string;
  showArrow?: boolean;
  onPress?: () => void;
};

const SettingsItem = ({
  icon,
  title,
  textStyle,
  showArrow = true,
  onPress,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};
