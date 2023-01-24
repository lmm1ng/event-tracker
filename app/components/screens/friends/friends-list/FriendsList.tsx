import { Avatar } from '@/components/avatar/Avatar'
import { UICard } from '@/components/ui/card/UI-card'
import { IPublicUser } from '@/models/user'
import { THEME } from '@/theme/theme'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

interface IFriendsListProps {
	friends: IPublicUser[]
}

export const FriendsList: FC<IFriendsListProps> = ({ friends }) => {
	return (
		<UICard>
			{friends.map(friend => (
				<View
					key={friend.id}
					style={styles.friend}
				>
					<Avatar
						user={friend}
						nameFirst={false}
					/>
					<AntDesign
						name='deleteuser'
						size={25}
						color={THEME.dangerColor}
					/>
				</View>
			))}
		</UICard>
	)
}

const styles = StyleSheet.create({
	friend: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
})
