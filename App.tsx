import { AuthContextProvider } from '@/hooks/useAuth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'

import { Entry } from '@/Entry'

LogBox.ignoreLogs([
	'Non-serializable values were found in the navigation state'
])


export default function App() {
	return (
		<AuthContextProvider>
			<SafeAreaProvider>
				<Entry />
			</SafeAreaProvider>
		</AuthContextProvider>
	)
}

