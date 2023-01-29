import api from '@/api'
import { FeedElement } from '@/components/screens/home/feed/feed-element/FeedElement'
import { UICard } from '@/components/ui/card/UI-card'
import { UIDivider } from '@/components/ui/divider/UI-divider'
import { UILoader } from '@/components/ui/loader/UI-loader'
import { Text } from '@/components/ui/text/Text'
import { useFeed } from '@/hooks/queries/useFeed'
import { useFriends } from '@/hooks/queries/useFriends'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback } from 'react'
import { ScrollView, View, ViewProps } from 'react-native'

interface IFeedProps extends ViewProps {}

export const Feed: FC<IFeedProps> = ({ style: outerStyle }) => {
	const { data: feed, isLoading: isFeedLoading, refetch: refetchFeed } = useFeed()
	const { data: friends } = useFriends()

	useFocusEffect(
		useCallback(() => {
			refetchFeed()
		}, [])
	)
	return (
		<UICard
			title='Feed'
			withDivider={false}
			style={outerStyle}
		>
			<ScrollView>
				{!isFeedLoading ? (
					<>
						{feed.length && friends.length ? (
							feed.map((feedEl, i, arr) => (
								<View key={feedEl.eventId}>
									<FeedElement
										feedElement={feedEl}
										user={friends.find(friend => friend.id === feedEl.userId)}
										style={[i !== arr.length - 1 && { marginBottom: 15 }]}
									/>
									{i !== arr.length - 1 && <UIDivider />}
								</View>
							))
						) : (
							<View>
								<Text>No friend activity</Text>
							</View>
						)}
					</>
				) : (
					<UILoader />
				)}
			</ScrollView>
		</UICard>
	)
}
