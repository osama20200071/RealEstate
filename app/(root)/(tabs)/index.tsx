import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

const HomeScreen = () => {
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
      <Link
        className="bg-slate-700 px-6 py-2 rounded text-slate-200 font-rubik"
        href="/sign-in"
      >
        Sign IN
      </Link>
      <Link
        className="bg-slate-700 px-6 py-2 rounded text-slate-200"
        href="/explore"
      >
        explore{" "}
      </Link>
      <Link
        className="bg-slate-700 px-6 py-2 rounded text-slate-200"
        href="/profile"
      >
        profile
      </Link>
      <Link
        className="bg-slate-700 px-6 py-2 rounded text-slate-200"
        href="/properties/22"
      >
        property 22
      </Link>
    </View>
  );
};

export default HomeScreen;
