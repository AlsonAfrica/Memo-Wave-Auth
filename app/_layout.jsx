// _layout.jsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      // Define default options for all screens
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      {/* Landing page route */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      
      {/* Login route - Changed from modal to card presentation */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          presentation: 'card',  // Changed from 'modal' to 'card'
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      />
      
      {/* Sign-up route - Changed from modal to card presentation */}
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
          presentation: 'card',  // Changed from 'modal' to 'card'
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      />
      
      {/* Record page route */}
      <Stack.Screen
        name="record"
        options={{
          title: 'Record Audio',
          headerShown: true,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}