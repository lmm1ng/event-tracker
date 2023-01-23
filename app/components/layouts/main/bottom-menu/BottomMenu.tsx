import { RootRoutesParams } from '@/Entry'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRoute } from '@react-navigation/native'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const BottomMenu: FC = () => {
	const nav = useTypedNavigation()
	const route = useRoute()
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
		// {
		// 	id: 3,
		// 	name: 'profile'
		// }
	]

	return (
		<View style={styles.wrapper}>
			{menuItems.map(el => (
				<TouchableOpacity
					key={el.id}
					onPress={() => nav.navigate(el.routeName, {} as never)}
				>
					<AntDesign
						// @ts-ignore
						name={el.name}
						size={30}
						color={el.selectedFor.includes(route.name) ? '#1F89DC' : '#A4AABA'}
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
		backgroundColor: '#38373A'
	}
})
