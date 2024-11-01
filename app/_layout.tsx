// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }

import { View, StyleSheet, Pressable } from "react-native";
import { Stack, Link, Href } from "expo-router";
import { Logo } from "@/components/Logo";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout(){
	return(
		<View style={styles.viewLayout}>
			<Stack 
				screenOptions={{
					headerStyle: {
						backgroundColor: '#22d3ee'
					},
					headerTintColor: "yellow",
					headerTitle: "",
					headerLeft: () => <Logo />,
					headerRight: () => (
						<Link asChild href={`/about` as Href<string>}>
							<Pressable>
								<FontAwesome name="info-circle" size={24} color="white"/>
							</Pressable>
						</Link>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
        backgroundColor: 'black',
	}
})
