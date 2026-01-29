import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 px-entry-padding py-8">
      {/* TODO: Settings for theme switching, notifications, account */}
      <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Settings
      </Text>

      <Pressable
        onPress={() => router.push("/(onboarding)/select-theme")}
        className="bg-gray-100 dark:bg-slate-800 active:bg-gray-200 rounded-lg py-4 px-5 mb-3"
      >
        <Text className="text-base text-gray-900 dark:text-gray-100">
          Change Theme Word
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(auth)/sign-in")}
        className="bg-gray-100 dark:bg-slate-800 active:bg-gray-200 rounded-lg py-4 px-5"
      >
        <Text className="text-base text-gray-900 dark:text-gray-100">
          Sign In for Sync
        </Text>
      </Pressable>
    </View>
  );
}
