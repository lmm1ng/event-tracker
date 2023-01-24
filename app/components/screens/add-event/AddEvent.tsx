import { RootRoutesParams } from '@/Entry'
import api from '@/api'
import { CreateEventTypeModal } from '@/components/screens/add-event/create-event-type-modal/CreateEventTypeModal'
import { EventsTypesList } from '@/components/screens/add-event/event-types-list/EventsTypesList'
import { UIButton } from '@/components/ui/button/UI-button'
import { UICalendar } from '@/components/ui/calendar/UI-calendar'
import { UIInput } from '@/components/ui/input/UI-input'
import { UIModal } from '@/components/ui/modal/UI-modal'
import { Text } from '@/components/ui/text/Text'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEventType } from '@/models/eventType'
import { formatDate, trimDate } from '@/utils/date-converter'
import AntDesign from '@expo/vector-icons/AntDesign'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { DateData } from 'react-native-calendars/src'

export const AddEvent: FC<
	// @ts-ignore
	NativeStackScreenProps<RootRoutesParams, 'AddEvent'>
> = ({ route }) => {
	const { token } = useContext(AuthContext)

	const nav = useTypedNavigation()

	const [currentDate, setCurrenDate] = useState(route.params.initialDate)
	const [isChangeCurrentDateModal, setCurrentDateModal] = useState(false)
	const onCurrentDateSubmit = (date: DateData) => {
		setCurrenDate(() => new Date(date.dateString))
		setCurrentDateModal(false)
	}

	const [eventTypes, setEventTypes] = useState<IEventType[]>([])

	const updateEventTypes = () => {
		return api.events.getEventTypes(token).then(res => setEventTypes(res.data))
	}

	useEffect(() => {
		updateEventTypes()
	}, [])

	const [searchBoxValue, setSearchBoxValue] = useState('')

	const filteredTypes = useMemo(() => {
		return eventTypes.filter(type => type.eventType.includes(searchBoxValue))
	}, [searchBoxValue, eventTypes])

	const [checkedType, setCheckedType] = useState(-1)

	useEffect(() => {
		setCheckedType(-1)
	}, [filteredTypes.length])

	const createEvent = () => {
		api.events
			.createEvent(
				{
					date: formatDate(currentDate),
					eventTypeId: checkedType
				},
				token
			)
			.then(() => nav.navigate('MonthCalendar'))
	}

	const [isCreateEventTypeModal, setCreateEventTypeModal] = useState(false)
	return (
		<>
			<UIModal
				show={isChangeCurrentDateModal}
				onClose={() => setCurrentDateModal(false)}
			>
				<UICalendar
					onDayPress={date => onCurrentDateSubmit(date)}
					maxDate={trimDate(new Date())}
				/>
			</UIModal>
			<CreateEventTypeModal
				show={isCreateEventTypeModal}
				close={() => setCreateEventTypeModal(false)}
			/>
			<View style={styles.wrapper}>
				<Text
					style={styles.dateText}
					onPress={() => setCurrentDateModal(true)}
				>
					<AntDesign
						name='calendar'
						size={20}
					/>
					{currentDate.toDateString()}
				</Text>
				{filteredTypes.length ? (
					<UIInput
						onChangeText={setSearchBoxValue}
						icon='search1'
						value={searchBoxValue}
					/>
				) : null}
				<ScrollView style={{ flex: 1, marginTop: 20 }}>
					<EventsTypesList
						types={filteredTypes}
						checked={checkedType}
						setChecked={setCheckedType}
					/>
				</ScrollView>
				<UIButton
					text='Create event type'
					variant='secondary'
					style={{ alignSelf: 'flex-end', width: 200, marginBottom: 20 }}
					onPress={() => setCreateEventTypeModal(true)}
				/>
				<UIButton
					text='Add'
					disabled={checkedType === -1}
					onPress={() => createEvent()}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		height: '100%'
	},
	dateText: {
		fontSize: 25,
		marginVertical: 20,
		textAlign: 'center'
	}
})
