import { useContext } from 'react'
import { AuthContext } from '@/hooks/useAuth'
import { NavigationContainer } from '@react-navigation/native'
import { Login } from '@/components/screens/login/Login'
import { MonthCalendar } from '@/components/screens/month-calendar/MonthCalendar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { Home } from '@/components/screens/home/Home'
import { AddEvent } from '@/components/screens/add-event/AddEvent'
import { navigationRef } from '@/utils/rootNavigation'

const Stack = createNativeStackNavigator()

export interface IAuthRoutesParams {
	Home: undefined,
	MonthCalendar: undefined,
	AddEvent: {
		initialDate: Date
	}
}

const routes = [
	<Stack.Screen name='Login' key='Login' component={Login} options={{ headerShown: false }} />
]
const protectedRoutes = [
	<Stack.Screen name='MonthCalendar' key='MonthCalendar' component={MonthCalendar} options={{ headerShown: false }} />,
	<Stack.Screen name='Home' key='Home' component={Home} options={{ headerShown: false }} />,
	<Stack.Screen name='AddEvent' key='AddEvent' component={AddEvent} options={{ headerShown: false }} />
]

export const Entry = () => {
	const { isAuth } = useContext(AuthContext)
	const insets = useSafeAreaInsets()
	return (
		<View style={{
			width: '100%',
			height: '100%',
			paddingTop: insets.top,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator>
					{isAuth ? (
							<Stack.Group screenOptions={{ animation: 'fade' }}>
								{protectedRoutes}
								{routes}
							</Stack.Group>
						)
						: (
							<Stack.Group>
								{routes}
							</Stack.Group>
						)
					}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}