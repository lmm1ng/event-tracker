import { Avatar } from '@/components/avatar/Avatar'
import { Text } from '@/components/ui/text/Text'
import { IFeedElement } from '@/models/feed'
import { IPublicUser } from '@/models/user'
import { THEME } from '@/theme/theme'
import { dateString, fromNow } from '@/utils/date-converter'
import { hashColor } from '@/utils/hash-color'
import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface IFeedElementProps extends ViewProps {
	feedElement?: IFeedElement
	user?: IPublicUser
}

export const FeedElement: FC<IFeedElementProps> = ({
	feedElement,
	user,
	style: outerStyle
}) => {
	return (
		<>
			{feedElement && user ? (
				<View style={[outerStyle]}>
					<Avatar
						user={user}
						size='small'
						nameFirst={false}
						subtext={fromNow(feedElement.createdAt)}
						styles={{ marginBottom: 8 }}
					/>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<View style={styles.eventType}>
							<View
								style={[
									styles.dot,
									{
										backgroundColor: hashColor(
											feedElement.eventTypeId.toString()
										)
									}
								]}
							/>
							<Text>{feedElement.eventType}</Text>
						</View>
						<Text>{dateString(feedElement.date)}</Text>
					</View>
				</View>
			) : null}
		</>
	)
}

const styles = StyleSheet.create({
	eventType: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginRight: 5
	}
})
