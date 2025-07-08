import { useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Restaurant() {
    const { restaurant } = useLocalSearchParams();
    console.log(restaurant);
    return (
        <SafeAreaView style={[{ backgroundColor: "#2b2b2b" },
        Platform.OS === "android" && { paddingBottom: 70 },
        Platform.OS === "ios" && { paddingBottom: 20 }
        ]}>
            <ScrollView className="h-full">
                <View className="flex-1 my-2 p-2">
                    <Text className="text-[#f49b33] text-xl mr-2 font-semibold">{restaurant}</Text>
                    <View className="border-b-2 border-[#f49b33]"></View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}