import api from '@/api'
import { UIInput } from '@/components/ui/input/UI-input'
import { UIModal } from '@/components/ui/modal/UI-modal'
import { AuthContext } from '@/hooks/useAuth'
import { raiseSuccess } from '@/utils/toast'
import { FC, useContext, useState } from 'react'

interface IAddFriendModalProps {
	show: boolean
	close: () => void
}

export const AddFriendModal: FC<IAddFriendModalProps> = ({ show, close }) => {
	const { token } = useContext(AuthContext)

	const [username, setUsername] = useState<string>('')

	const closeModal = () => {
		setUsername('')
		close()
	}

	const onSubmit = () => {
		if (username) {
			api.friends.invite({ username }, token).then(() => {
				raiseSuccess({ message: 'Invite successfully sent' })
				closeModal()
			})
		}
	}

	return (
		<UIModal
			show={show}
			onClose={() => closeModal()}
			onSubmit={() => onSubmit()}
			title='Add friend'
			withButtons
		>
			<UIInput
				placeholder='Username'
				value={username}
				onChangeText={setUsername}
			/>
		</UIModal>
	)
}
