import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="entry"
        options={{ title: "One Word", headerShown: false }}
      />
      <Stack.Screen
        name="comments"
        options={{ title: "Comments", presentation: "modal" }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "Settings" }}
      />
    </Stack>
  );
}
