import api from '@/api'
import { Avatar } from '@/components/avatar/Avatar'
import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { Feed } from '@/components/screens/home/feed/Feed'
import { Text } from '@/components/ui/text/Text'
import { PeriodTypes } from '@/constants/periodTypes'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserContext } from '@/hooks/useUser'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { THEME } from '@/theme/theme'
import { dateString, formatDate } from '@/utils/date-converter'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

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

	const goToProfile = () => {
		nav.navigate('Profile')
	}

	return (
		<View style={{ height: '100%' }}>
			<Avatar
				user={user}
				onPress={() => goToProfile()}
				style={{
					marginTop: 20,
					alignSelf: 'flex-end',
				}}
			/>
			<Text style={styles.dateText}>
				{dateString({ date: currentDate, variant: 'full' })}
			</Text>
			<View style={{ flex: 1, marginBottom: 15 }}>
				<EventsLegend
					events={eventsList}
					eventTypes={eventTypes}
					variant='big'
					header={false}
					style={{ marginBottom: 15, maxHeight: '25%' }}
				/>
				<Feed style={{ maxHeight: '70%' }} />
			</View>
		</View>
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
	}
})
