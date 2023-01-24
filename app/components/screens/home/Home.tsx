import api from '@/api'
import { Avatar } from '@/components/avatar/Avatar'
import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { Feed } from '@/components/screens/home/feed/Feed'
import { Text } from '@/components/ui/text/Text'
import { PeriodTypes } from '@/constants/periodTypes'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserContext } from '@/hooks/useUser'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { THEME } from '@/theme/theme'
import { formatDate } from '@/utils/date-converter'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const Home: FC = ({}) => {
	const { token } = useContext(AuthContext)
	const { user } = useContext(UserContext)

	const nav = useTypedNavigation()

	const [currentDate, setCurrentDate] = useState(new Date())

	const [eventsList, setEventsList] = useState<IEvent[]>([])
	const [eventTypes, setEventTypes] = useState<IEventType[]>([])

	const updateEventList = () => {
		return api.events
			.getEvents(
				{ date: formatDate(currentDate), periodType: PeriodTypes.Day },
				token
			)
			.then(res => setEventsList(() => res.data))
	}
	const updateEventTypes = () => {
		return api.events
			.getEventTypes(token)
			.then(res => setEventTypes(() => res.data))
	}

	useEffect(() => {
		updateEventList()
	}, [currentDate])

	useFocusEffect(
		useCallback(() => {
			updateEventTypes()
			updateEventList()
		}, [])
	)

	const goToAddEvent = () => {
		nav.navigate('AddEvent', { initialDate: currentDate })
	}

	const goToProfile = () => {
		nav.navigate('Profile')
	}

	return (
		<MainLayout>
			<Avatar
				user={user}
				onPress={() => goToProfile()}
				styles={{ marginTop: 20, alignSelf: 'flex-end' }}
			/>
			<Text style={styles.dateText}>{currentDate.toDateString()}</Text>
			<View style={{ flex: 1 }}>
				<EventsLegend
					events={eventsList}
					eventTypes={eventTypes}
					variant='big'
					header={false}
					style={{ marginBottom: 15 }}
				/>
				<Feed />
			</View>
			<View style={styles.addEventButton}>
				<TouchableOpacity onPress={() => goToAddEvent()}>
					<AntDesign
						name='pluscircle'
						color={THEME.primaryColor}
						size={50}
					/>
				</TouchableOpacity>
			</View>
		</MainLayout>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		display: 'flex'
	},
	dateText: {
		fontSize: THEME.fontSizeHeader + 8,
		marginVertical: 10,
		marginLeft: 10
	},
	addEventButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 15
	}
})
