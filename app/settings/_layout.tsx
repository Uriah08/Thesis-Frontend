import { Stack } from "expo-router"

const SettingsLayput = () => {
  return (
    <Stack>
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="change-password"
          options={{
            headerShown: false,
          }}
        />
    </Stack>
  )
}

export default SettingsLayput