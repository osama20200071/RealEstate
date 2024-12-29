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
      <Link style={{ padding: 6, backgroundColor: "white" }} href="/sign-in">
        Sign IN
      </Link>
      <Link style={{ padding: 6, backgroundColor: "white" }} href="/explore">
        explore{" "}
      </Link>
      <Link style={{ padding: 6, backgroundColor: "white" }} href="/profile">
        profile
      </Link>
      <Link
        style={{ padding: 6, backgroundColor: "white" }}
        href="/properties/22"
      >
        property 22
      </Link>
    </View>
  );
};

export default HomeScreen;
