import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'


export const BottomMenu: FC = (props) => {
	const nav = useNavigation()
	const route = useRoute()
	const menuItems: { id: number, name: string, routeName: string, selectedFor: string[] }[] = [
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
			selectedFor: ['Home', 'AddEvent']
		}
		// {
		// 	id: 3,
		// 	name: 'profile'
		// }
	]

	return (
		<View style={styles.wrapper}>
			{menuItems.map(el => (
				<TouchableOpacity key={el.id} onPress={() => nav.navigate(el.routeName)}>
					<AntDesign name={el.name} size={30} color={el.selectedFor.includes(route.name) ? '#1F89DC' : '#A4AABA'} />
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