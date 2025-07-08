import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";

// const logo = require("../assets/images/dinetimelogo.png");
const entryImg = require("../assets/images/Frame.png"); // Update the path as necessary
export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 300, height: 300 }} />
          <View className="w-3/4">
            <TouchableOpacity
              className="p-2 my-2 bg-[#f49b33] rounded-lg"
              onPress={() => router.push("/signup")}
            >
              <Text
                className="text-lg font-semibold text-center">SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 my-2 bg-[#2b2b2b] border border-[#f49b33] rounded-lg"
              onPress={() => router.push("/home")}>
              <Text
                className="text-lg font-semibold text-center text-[#f49b33]">Guest User</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-center text-white text-lg font-semibold my-4">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" /> or {" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity className="flex flex-row items-center justify-center" onPress={() => router.push("/signin")}>
              <Text className="text-white font-semibold">Already a User?{" "}</Text>
              <Text className="text-base  font-semibold underline text-[#f49b33]">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1">
            <Image  source={entryImg} className="w-full h-full" resizeMode="contain"/>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
