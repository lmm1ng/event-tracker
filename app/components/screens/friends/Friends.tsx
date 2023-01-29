import api from '@/api'
import { AddFriendModal } from '@/components/screens/friends/add-friend-modal/AddFriendModal'
import { FriendsList } from '@/components/screens/friends/friends-list/FriendsList'
import { InvitesList } from '@/components/screens/friends/invites-list/InvitesList'
import { UIButton } from '@/components/ui/button/UI-button'
import { useFriends } from '@/hooks/queries/useFriends'
import { useInvites } from '@/hooks/queries/useInvites'
import { AuthContext } from '@/hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useState } from 'react'
import { StyleSheet } from 'react-native'

export const Friends: FC = () => {
	const { token } = useContext(AuthContext)

	const { data: invites, refetch: refetchInvites } = useInvites()
	const { data: friends, isLoading: isFriendsLoading, refetch: refetchFriends } = useFriends()

	const onAcceptInvite = (id: number) => {
		api.friends
			.acceptInvite({ id }, token)
			.then(() => refetchInvites())
			.then(() => refetchFriends())
	}
	const onCancelInvite = (id: number) => {
		api.friends.cancelInvite({ id }, token).then(() => refetchInvites())
	}

	useFocusEffect(
		useCallback(() => {
			refetchInvites()
			refetchFriends()
		}, [])
	)

	const [isAddFriendModal, setAddFriendModal] = useState(false)

	return (
		<>
			<AddFriendModal
				show={isAddFriendModal}
				close={() => setAddFriendModal(false)}
			/>
			{invites.length ? (
				<InvitesList
					invites={invites}
					onAcceptInvite={onAcceptInvite}
					onCancelInvite={onCancelInvite}
					style={{ maxHeight: '35%' }}
				/>
			) : null}
			<UIButton
				style={styles.addButton}
				text='Add friend'
				onPress={() => setAddFriendModal(true)}
			/>
			<FriendsList
				friends={friends}
				isFriendsLoading={isFriendsLoading}
				style={{ maxHeight: '50%' }}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	addButton: {
		marginVertical: 20
	}
})
