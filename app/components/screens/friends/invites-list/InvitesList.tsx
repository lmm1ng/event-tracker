import { Avatar } from '@/components/avatar/Avatar'
import { UICard } from '@/components/ui/card/UI-card'
import { IInvite } from '@/models/invite'
import { THEME } from '@/theme/theme'
import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import {
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	ViewProps
} from 'react-native'

interface IInvitesListProps extends ViewProps {
	invites: IInvite[]
	onAcceptInvite: (id: number) => void
	onCancelInvite: (id: number) => void
}

export const InvitesList: FC<IInvitesListProps> = ({
	invites,
	style: outerStyle,
	onAcceptInvite,
	onCancelInvite
}) => {
	return (
		<UICard
			title='Pending invites'
			style={outerStyle}
		>
			<ScrollView>
				{invites.map(invite => (
					<View
						key={invite.user.id}
						style={styles.invite}
					>
						<Avatar
							user={invite.user}
							nameFirst={false}
						/>
						<View style={styles.buttons}>
							<Pressable
								style={{ marginRight: 20 }}
								onPress={() => onCancelInvite(invite.id)}
							>
								<Feather
									name='user-minus'
									size={25}
									color={THEME.dangerColor}
								/>
							</Pressable>
							<Pressable onPress={() => onAcceptInvite(invite.id)}>
								<Feather
									name='user-plus'
									size={25}
									color={THEME.primaryColor}
								/>
							</Pressable>
						</View>
					</View>
				))}
			</ScrollView>
		</UICard>
	)
}

const styles = StyleSheet.create({
	invite: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5
	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
