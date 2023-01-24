import api from '@/api'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { AddFriendModal } from '@/components/screens/friends/add-friend-modal/AddFriendModal'
import { FriendsList } from '@/components/screens/friends/friends-list/FriendsList'
import { InvitesList } from '@/components/screens/friends/invites-list/InvitesList'
import { UIButton } from '@/components/ui/button/UI-button'
import { AuthContext } from '@/hooks/useAuth'
import { IInvite } from '@/models/invite'
import { IPublicUser } from '@/models/user'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useState } from 'react'
import { StyleSheet } from 'react-native'

export const Friends: FC = () => {
	const { token } = useContext(AuthContext)

	const [invites, setInvites] = useState<IInvite[]>([])

	const updateInvites = () => {
		return api.friends.getInvites(token).then(res => setInvites(res.data))
	}

	const onAcceptInvite = (id: number) => {
		api.friends.acceptInvite({ id }, token).then(() => updateInvites())
	}
	const onCancelInvite = (id: number) => {
		api.friends.cancelInvite({ id }, token).then(() => updateInvites())
	}

	const [friends, setFriends] = useState<IPublicUser[]>([])

	const updateFriends = () => {
		return api.friends.getFriends(token).then(res => setFriends(res.data))
	}

	useFocusEffect(
		useCallback(() => {
			updateInvites()
			updateFriends()
		}, [])
	)

	const [isAddFriendModal, setAddFriendModal] = useState(false)

	return (
		<MainLayout>
			<AddFriendModal
				show={isAddFriendModal}
				close={() => setAddFriendModal(false)}
			/>
			{invites.length ? (
				<InvitesList
					invites={invites}
					onAcceptInvite={onAcceptInvite}
					onCancelInvite={onCancelInvite}
				/>
			) : null}
			<UIButton
				style={styles.addButton}
				text='Add friend'
				onPress={() => setAddFriendModal(true)}
			/>
			<FriendsList friends={friends} />
		</MainLayout>
	)
}

const styles = StyleSheet.create({
	addButton: {
		marginVertical: 20
	}
})
