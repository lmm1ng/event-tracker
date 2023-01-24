import { RootRoutesParams } from '@/Entry'
import { useCurrentRoute } from '@/hooks/useCurrentRoute'
import { THEME } from '@/theme/theme'
import { navigate, navigationRef } from '@/utils/rootNavigation'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const BottomMenu: FC = () => {
	const menuItems: {
		id: number
		name: string
		routeName: keyof RootRoutesParams
		selectedFor: string[]
	}[] = [
		{
			id: 1,
			name: 'calendar',
			routeName: 'MonthCalendar',
			selectedFor: ['MonthCalendar']
		},
		{
			id: 2,
			name: 'home',
			routeName: 'Home',
			selectedFor: ['Home', 'AddEvent', 'Profile']
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
					onPress={() => onNavigate(el.routeName)}
				>
					<AntDesign
						// @ts-ignore
						name={el.name}
						size={25}
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
		paddingBottom: 20,
		paddingTop: 10,
		backgroundColor: THEME.inputBackgroundColor
	}
})
