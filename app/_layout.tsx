import { Stack } from "expo-router";
import '../global.css';
import StoreProvider from "@/provider/provider";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </StoreProvider>
  );
}
