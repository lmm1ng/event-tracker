import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IAuthRoutesParams } from '@/Entry'
import { SearchBar } from '@rneui/base'
import { IEventType } from '@/models/eventType'
import api from '@/api'
import { AuthContext } from '@/hooks/useAuth'
import { EventsTypesList } from '@/components/screens/add-event/event-types-list/EventsTypesList'
import { Button, Dialog } from '@rneui/themed'
import { Calendar, DateData } from 'react-native-calendars/src'
import { formatDate, trimDate } from '@/utils/date-converter'
import AntDesign from '@expo/vector-icons/AntDesign'
import { CreateEventTypeModal } from '@/components/screens/add-event/create-event-type-modal/CreateEventTypeModal'
import { useNavigation } from '@react-navigation/native'

export const AddEvent: FC<NativeStackScreenProps<IAuthRoutesParams, 'AddEvent'>> = ({ route }) => {
	const { token } = useContext(AuthContext)

	const nav = useNavigation()

	const [currentDate, setCurrenDate] = useState(route.params.initialDate)
	const [isChangeCurrentDateModal, setCurrentDateModal] = useState(false)
	const onCurrentDateSubmit = (date: DateData) => {
		setCurrenDate(() => new Date(date.dateString))
		setCurrentDateModal(false)
	}

	const [eventTypes, setEventTypes] = useState<IEventType[]>([])

	const updateEventTypes = () => {
		return api.events.getEventTypes(token)
			.then(res => setEventTypes(res.data.data))
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
		api.events.createEvent({
			date: formatDate(currentDate),
			eventTypeId: checkedType
		}, token)
			.then(() => nav.navigate('MonthCalendar'))
	}

	const [isCreateEventTypeModal, setCreateEventTypeModal] = useState(false)
	return (
		<MainLayout>
			<Dialog
				isVisible={isChangeCurrentDateModal}
				onBackdropPress={() => setCurrentDateModal(false)}
			>
				<Calendar
					onDayPress={(date) => onCurrentDateSubmit(date)}
					maxDate={trimDate(new Date())}
				/>
			</Dialog>
			<View style={styles.wrapper}>
				<Text
					style={styles.dateText}
					onPress={() => setCurrentDateModal(true)}
				>
					<AntDesign name='calendar' size={20} />
					{currentDate.toDateString()}
				</Text>
				<SearchBar
					platform='android'
					onChangeText={setSearchBoxValue}
					value={searchBoxValue}
				/>
				<ScrollView style={{ flex: 1, marginTop: 20 }}>
					<EventsTypesList
						types={filteredTypes}
						checked={checkedType}
						setChecked={setCheckedType}
					/>
				</ScrollView>
				<Button
					title='Create event type'
					type='clear'
					containerStyle={{ alignSelf: 'flex-end' }}
					onPress={() => setCreateEventTypeModal(true)}
				/>
				<Button
					title='Add'
					containerStyle={styles.addButton}
					disabled={checkedType === -1}
					onPress={() => createEvent()}
				/>
			</View>
			<CreateEventTypeModal
				show={isCreateEventTypeModal}
				close={() => setCreateEventTypeModal(false)}
			/>
		</MainLayout>
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
	},
	addButton: {}
})