import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const HomeScreen = () => {
  const { isLoggedIn, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      refetch();
    } else {
      Alert.alert("Error", "failed to logout ");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 13,
      }}
    >
      <StatusBar style="dark" />
      {
        <Link
          className="bg-slate-700 px-6 py-2 rounded text-slate-200 font-rubik"
          href="/sign-in"
        >
          Sign IN
        </Link>
      }
      {/* {isLoggedIn && (
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="bg-white shadow-md shadow-zinc-600 rounded-full w-4/6 py-4 mt-4"
        >
          <Text className="text-lg font-rubik-medium text-black-300 text-center">
            Logout
          </Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default HomeScreen;
