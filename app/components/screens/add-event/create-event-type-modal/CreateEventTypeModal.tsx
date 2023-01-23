import api from '@/api'
import { UICheckbox } from '@/components/ui/checkbox/UI-checkbox'
import { UIInput } from '@/components/ui/input/UI-input'
import { UIModal } from '@/components/ui/modal/UI-modal'
import { AuthContext } from '@/hooks/useAuth'
import { FC, useContext, useState } from 'react'

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
		if (eventTypeName !== '') {
			api.events
				.createEventType(
					{ name: eventTypeName, isVisible: isTypeVisible },
					token
				)
				.then(() => closeModal())
		}
	}

	const closeModal = () => {
		setTypeVisible(() => false)
		setEventTypeName(() => '')
		close()
	}

	return (
		<UIModal
			show={show}
			onClose={() => closeModal()}
			title='New event type'
			withButtons
			onSubmit={() => submitModal()}
		>
			<UIInput
				placeholder='Name'
				value={eventTypeName}
				onChangeText={setEventTypeName}
			/>
			<UICheckbox
				label='Visible'
				value={isTypeVisible}
				onToggle={setTypeVisible}
				style={{ justifyContent: 'flex-end', marginTop: 10 }}
			/>
		</UIModal>
	)
}
