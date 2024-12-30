import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
export default function SignIn() {
  const { isLoggedIn, loading, refetch } = useGlobalContext();

  if (isLoggedIn && !loading) {
    return <Redirect href={"/"} />;
  }

  const handleLogin = async () => {
    const response = await login();
    if (response) {
      refetch(); // this will make the redirect also
    } else {
      Alert.alert("Error", "failed to login ");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingBottom: 20,
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-8">
          <Text className="text-base text-center font-rubik uppercase text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-center font-rubik-bold text-3xl text-black-300 mt-2">
            Let’s Get You Closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-center text-lg font-rubik text-black-200 mt-12">
            Login to Real Scout with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.7}
            className="bg-white shadow-md shadow-zinc-600 rounded-full w-full py-4 mt-4"
          >
            <View className="flex  flex-row items-center justify-center gap-3">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300">
                {" "}
                Sign Up with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
