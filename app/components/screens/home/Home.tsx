import api from '@/api'
import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { PeriodTypes } from '@/constants/periodTypes'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { formatDate } from '@/utils/date-converter'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const Home: FC = ({}) => {
	const { token } = useContext(AuthContext)

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

	return (
		<MainLayout>
			<View style={{ height: '100%' }}>
				<Text style={styles.dateText}>{currentDate.toDateString()}</Text>
				<View style={{ flex: 1 }}>
					<EventsLegend
						events={eventsList}
						eventTypes={eventTypes}
						variant='big'
						header={false}
					/>
				</View>
				<View style={styles.addEventButton}>
					<TouchableOpacity onPress={() => goToAddEvent()}>
						<AntDesign
							name='pluscircle'
							color='#1F89DC'
							size={60}
						/>
					</TouchableOpacity>
				</View>
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
		fontSize: 30,
		marginTop: 10,
		marginLeft: 10
	},
	addEventButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20
	}
})
