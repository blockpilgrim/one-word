import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const THEMES = [
  "Presence",
  "Connection",
  "Clarity",
  "Courage",
  "Resilience",
  "Patience",
  "Gratitude",
] as const;

export default function SelectThemeScreen() {
  const router = useRouter();

  const handleThemeSelect = (_theme: string) => {
    // TODO: Persist selected theme via Zustand store
    router.replace("/(main)/entry");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-12"
      >
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Choose Your Word
        </Text>
        <Text className="text-base text-gray-500 dark:text-gray-400 mb-8">
          Pick the idea you want to focus on.
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {THEMES.map((theme) => (
            <Pressable
              key={theme}
              onPress={() => handleThemeSelect(theme)}
              className="bg-gray-100 dark:bg-slate-800 active:bg-brand-100 dark:active:bg-brand-900 rounded-full py-3 px-6"
            >
              <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
                {theme}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
