import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export function Loading() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-slate-900">
      <ActivityIndicator size="large" color={colors.lime[300]} />
    </SafeAreaView>
  );
}
