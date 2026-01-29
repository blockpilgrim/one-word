import { View, Text } from "react-native";

export default function CommentsScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-slate-900 px-entry-padding py-8">
      {/* TODO: Fetch and display comment thread via TanStack Query */}
      <Text className="text-base text-gray-500 dark:text-gray-400">
        Comment thread will appear here.
      </Text>
    </View>
  );
}
