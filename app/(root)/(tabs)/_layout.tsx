import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 10 }}
      screenLayout={({ children }) => (
        <SafeAreaView className="h-full bg-white">{children}</SafeAreaView>
      )}
      screenOptions={{
        tabBarActiveTintColor: "#0061ff",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton(props) {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={props.onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.children}
            </TouchableOpacity>
          );
        },
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
    <View className="flex flex-1 items-center justify-center mt-4 gap-1">
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
        } text-center  w-full text-xs`}
      >
        {title}
      </Text>
    </View>
  );
};

export default Layout;
