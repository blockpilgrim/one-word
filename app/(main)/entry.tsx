import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EntryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-entry-padding py-8">
        {/* TODO: Fetch and display today's entry via TanStack Query */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Today's Entry
        </Text>
        <Text className="text-base text-gray-500 dark:text-gray-400 mb-8">
          Entry content will appear here.
        </Text>

        <View className="flex-row gap-4">
          <Pressable
            onPress={() => router.push("/(main)/comments")}
            className="bg-gray-100 dark:bg-slate-800 active:bg-gray-200 rounded-lg py-3 px-5"
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Comments
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(main)/settings")}
            className="bg-gray-100 dark:bg-slate-800 active:bg-gray-200 rounded-lg py-3 px-5"
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Settings
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
