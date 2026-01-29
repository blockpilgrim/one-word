import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 items-center justify-center px-8">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Sign In
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-8">
        Sign in to sync your progress across devices. This is completely
        optional.
      </Text>

      {/* TODO: Implement Apple and Google sign-in via Supabase Auth */}
      <Pressable className="bg-black dark:bg-white rounded-xl py-4 px-8 w-full mb-3">
        <Text className="text-white dark:text-black font-semibold text-base text-center">
          Continue with Apple
        </Text>
      </Pressable>

      <Pressable className="bg-gray-100 dark:bg-slate-800 rounded-xl py-4 px-8 w-full mb-8">
        <Text className="text-gray-900 dark:text-gray-100 font-semibold text-base text-center">
          Continue with Google
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text className="text-brand-600 dark:text-brand-400 font-medium">
          Skip for now
        </Text>
      </Pressable>
    </View>
  );
}
