import { Avatar } from '@/components/avatar/Avatar'
import { UICard } from '@/components/ui/card/UI-card'
import { UILoader } from '@/components/ui/loader/UI-loader'
import { Text } from '@/components/ui/text/Text'
import { IPublicUser } from '@/models/user'
import { THEME } from '@/theme/theme'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FC } from 'react'
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native'

interface IFriendsListProps extends ViewProps {
	friends: IPublicUser[]
	isFriendsLoading: boolean
}

export const FriendsList: FC<IFriendsListProps> = ({
	friends,
	isFriendsLoading,
	style: outerStyle
}) => {
	return (
		<UICard
			title='Friends list'
			style={outerStyle}
		>
			<ScrollView>
				{!isFriendsLoading ? (
					<>
						{friends.length ? (
							friends.map(friend => (
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
							))
						) : (
							<Text>No friends yet</Text>
						)}
					</>
				) : (
					<UILoader />
				)}
			</ScrollView>
		</UICard>
	)
}

const styles = StyleSheet.create({
	friend: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 5
	}
})
