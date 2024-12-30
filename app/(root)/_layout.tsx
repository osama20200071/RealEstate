import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "@/lib/global-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";

const Layout = () => {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="h-full bg-white flex justify-center items-center ">
        <ActivityIndicator className="text-primary-300 " size="large" />
      </SafeAreaView>
    );
  }
  //!temp  =======================
  // if (!isLoggedIn) {
  //   return <Redirect href="/sign-in" />;
  // }

  return <Slot />;
};

export default Layout;
