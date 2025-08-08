import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import Toast, { ToastConfig, BaseToast } from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

import SafeView from "@/app/components/SafeView";
import { COLORS } from "@/constants/Colors";
import FontLoader from "@/app/components/FontLoader";

export default function RootLayout() {
  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLORS.income, backgroundColor: COLORS.income, borderRadius: 10, height: 75 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "700",
          color: COLORS.white,
        }}
        text2Style={{
          fontSize: 13,
          color: COLORS.white,
          marginTop: 5,
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLORS.expense, backgroundColor: COLORS.expense, borderRadius: 10, height: 75 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "700",
          color: COLORS.white,
        }}
        text2Style={{
          fontSize: 13,
          color: COLORS.white,
          marginTop: 5,
        }}
      />
    ),
  };

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <FontLoader>
        <SafeView>
          <Slot />
          <Toast config={toastConfig} />
        </SafeView>
      </FontLoader>
      <StatusBar style="inverted" />
    </ClerkProvider>
  );
}