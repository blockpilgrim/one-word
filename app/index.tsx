import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Check onboarding status and redirect accordingly
  // For now, always redirect to onboarding welcome screen
  const hasCompletedOnboarding = false;

  if (hasCompletedOnboarding) {
    return <Redirect href="/(main)/entry" />;
  }

  return <Redirect href="/(onboarding)/welcome" />;
}
