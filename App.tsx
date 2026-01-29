import "./global.css";

import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Text className="text-xl font-bold text-brand-600 dark:text-brand-400 mb-2">
        One Word
      </Text>
      <Text className="text-base text-gray-600 dark:text-gray-300">
        Choose your word. Let it guide you.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
