import api from '@/api'
import { AuthContext } from '@/hooks/useAuth'
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions'
import { DialogButton } from '@rneui/base/dist/Dialog/Dialog.Button'
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title'
import { Dialog, Input, Switch } from '@rneui/themed'
import { FC, useContext, useState } from 'react'
import { Text, View } from 'react-native'

interface ICreateEventTypeModalProps {
	show: boolean
	close: () => void
}

export const CreateEventTypeModal: FC<ICreateEventTypeModalProps> = ({
	show,
	close
}) => {
	const { token } = useContext(AuthContext)

	const [isTypeVisible, setTypeVisible] = useState(false)
	const [eventTypeName, setEventTypeName] = useState('')

	const submitModal = () => {
		api.events
			.createEventType({ name: eventTypeName, isVisible: isTypeVisible }, token)
			.then(() => closeModal())
	}

	const closeModal = () => {
		setTypeVisible(() => false)
		setEventTypeName(() => '')
		close()
	}

	return (
		<Dialog
			isVisible={show}
			onBackdropPress={() => closeModal()}
		>
			<DialogTitle title='New event type' />
			<Input
				value={eventTypeName}
				onChangeText={setEventTypeName}
			/>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-end'
				}}
			>
				<Text style={{ fontSize: 15, marginRight: 10 }}>Visible</Text>
				<Switch
					value={isTypeVisible}
					onValueChange={setTypeVisible}
				/>
			</View>
			<DialogActions>
				<DialogButton
					title='Create'
					disabled={eventTypeName === ''}
					onPress={() => submitModal()}
				/>
				<DialogButton
					title='Close'
					onPress={() => closeModal()}
				/>
			</DialogActions>
		</Dialog>
	)
}
