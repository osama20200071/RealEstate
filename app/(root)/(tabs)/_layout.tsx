import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";

const Layout = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 10 }}
      screenOptions={{
        tabBarActiveTintColor: "#0061ff",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

type TabIconProps = {
  icon: any;
  focused: boolean;
  title: string;
};

const TabIcon = ({ icon, focused, title }: TabIconProps) => {
  return (
    <View className="flex flex-1 items-center justify-center mt-4">
      <Image
        source={icon}
        resizeMode="contain"
        className="size-6"
        tintColor={focused ? "#0061ff" : "#666876"}
      />
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-center mt-1 w-full text-xs`}
      >
        {title}
      </Text>
    </View>
  );
};

export default Layout;
