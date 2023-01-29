import { Avatar } from '@/components/avatar/Avatar'
import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { Feed } from '@/components/screens/home/feed/Feed'
import { Text } from '@/components/ui/text/Text'
import { useEventTypes } from '@/hooks/queries/useEventTypes'
import { useDayEvents } from '@/hooks/queries/useEvents'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserContext } from '@/hooks/useUser'
import { THEME } from '@/theme/theme'
import { dateString } from '@/utils/date-converter'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

export const Home: FC = ({}) => {
	const { user } = useContext(UserContext)

	const nav = useTypedNavigation()

	const [currentDate, setCurrentDate] = useState(new Date())

	const {
		data: events,
		refetch: refetchEvents,
		isLoading: isEventsLoading
	} = useDayEvents(currentDate)

	const { data: eventTypes, isLoading: isEventTypesLoading } = useEventTypes()

	useFocusEffect(
		useCallback(() => {
			refetchEvents()
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
					alignSelf: 'flex-end'
				}}
			/>
			<Text style={styles.dateText}>{dateString({ date: currentDate, variant: 'full' })}</Text>
			<View style={{ flex: 1, marginBottom: 15 }}>
				<EventsLegend
					events={events}
					isEventsLoading={isEventsLoading}
					eventTypes={eventTypes}
					isEventTypesLoading={isEventTypesLoading}
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
		height: '100%'
	},
	dateText: {
		fontSize: THEME.fontSizeHeader + 8,
		marginVertical: 10,
		marginLeft: 10
	}
})
