import { AddEvent } from '@/components/screens/add-event/AddEvent'
import { Friends } from '@/components/screens/friends/Friends'
import { Home } from '@/components/screens/home/Home'
import { Login } from '@/components/screens/login/Login'
import { MonthCalendar } from '@/components/screens/month-calendar/MonthCalendar'
import { Profile } from '@/components/screens/profile/Profile'
import { AuthContext } from '@/hooks/useAuth'
import { THEME } from '@/theme/theme'
import { navigationRef } from '@/utils/rootNavigation'
import {
	DefaultTheme,
	NavigationContainer,
	Theme
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { View } from 'react-native'

export type RootRoutesParams = {
	Home: undefined
	MonthCalendar: undefined
	Login: undefined
	AddEvent: {
		initialDate: Date
	}
	Profile: undefined
	Friends: undefined
}

const customTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: THEME.screenBackgroundColor
	}
}

const Stack = createNativeStackNavigator<RootRoutesParams>()

const routes = [
	<Stack.Screen
		name='Login'
		key='Login'
		component={Login}
		options={{ headerShown: false }}
	/>
]
const protectedRoutes = [
	<Stack.Screen
		name='MonthCalendar'
		key='MonthCalendar'
		component={MonthCalendar}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Home'
		key='Home'
		component={Home}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='AddEvent'
		key='AddEvent'
		component={AddEvent}
		initialParams={{ initialDate: new Date() }}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Profile'
		key='Profile'
		component={Profile}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Friends'
		key='Friends'
		component={Friends}
		options={{ headerShown: false }}
	/>
]

export const Entry = () => {
	const { isAuth } = useContext(AuthContext)
	return (
		<View
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			<NavigationContainer
				ref={navigationRef}
				theme={customTheme}
			>
				<Stack.Navigator>
					{isAuth ? (
						<Stack.Group screenOptions={{ animation: 'fade' }}>
							{protectedRoutes}
							{routes}
						</Stack.Group>
					) : (
						<Stack.Group>{routes}</Stack.Group>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}
