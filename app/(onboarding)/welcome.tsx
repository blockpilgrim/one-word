import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-4">
          One Word
        </Text>
        <Text className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
          Choose your word. Let it guide you.
        </Text>
        <Pressable
          onPress={() => router.push("/(onboarding)/select-theme")}
          className="bg-brand-600 active:bg-brand-700 rounded-xl py-4 px-8"
        >
          <Text className="text-white font-semibold text-base">
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
