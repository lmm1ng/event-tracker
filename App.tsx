import { Entry } from '@/Entry'
import { AuthContextProvider } from '@/hooks/useAuth'
import { UserContextProvider } from '@/hooks/useUser'
import { LogBox, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

LogBox.ignoreLogs([
	'Non-serializable values were found in the navigation state'
])

export default function App() {
	return (
		<UserContextProvider>
			<AuthContextProvider>
				<SafeAreaProvider>
					<Entry />
				</SafeAreaProvider>
			</AuthContextProvider>
		</UserContextProvider>
	)
}
