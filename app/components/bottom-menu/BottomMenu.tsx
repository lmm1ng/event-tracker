import { RootRoutesParams } from '@/Entry'
import { useCurrentRoute } from '@/hooks/useCurrentRoute'
import { THEME } from '@/theme/theme'
import { navigate } from '@/utils/rootNavigation'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type Route<T extends keyof RootRoutesParams> = {
	name: T
	options?: RootRoutesParams[T]
}

export const BottomMenu: FC = () => {
	const menuItems: {
		id: number
		name: string
		route: Route<keyof RootRoutesParams>
		selectedFor: string[]
	}[] = [
		{
			id: 1,
			name: 'calendar',
			route: {
				name: 'MonthCalendar'
			},
			selectedFor: ['MonthCalendar']
		},
		{
			id: 2,
			name: 'plussquareo',
			route: {
				name: 'AddEvent',
				options: { initialDate: new Date() }
			},
			selectedFor: ['AddEvent']
		},
		{
			id: 3,
			name: 'home',
			route: {
				name: 'Home'
			},
			selectedFor: ['Home', 'Profile', 'Friends']
		}
	]

	const onNavigate = (routeName: keyof RootRoutesParams) => {
		navigate(routeName, {} as never)
	}

	const currentRoute = useCurrentRoute()

	return (
		<View style={styles.wrapper}>
			{menuItems.map(el => (
				<TouchableOpacity
					key={el.id}
					onPress={() => onNavigate(el.route.name)}
					style={styles.menuItem}
				>
					<AntDesign
						// @ts-ignore
						name={el.name}
						size={27}
						color={
							el.selectedFor.includes(currentRoute)
								? THEME.primaryColor
								: THEME.textColor
						}
					/>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 60,
		alignItems: 'center',
		backgroundColor: THEME.inputBackgroundColor
	},
	menuItem: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
