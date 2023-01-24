import api from '@/api'
import { FeedElement } from '@/components/screens/home/feed/feed-element/FeedElement'
import { UICard } from '@/components/ui/card/UI-card'
import { UIDivider } from '@/components/ui/divider/UI-divider'
import { AuthContext } from '@/hooks/useAuth'
import { IFeedElement } from '@/models/feed'
import { IPublicUser } from '@/models/user'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useState } from 'react'
import { View } from 'react-native'

export const Feed: FC = () => {
	const { token } = useContext(AuthContext)
	const [feed, setFeed] = useState<IFeedElement[]>([])
	const [friends, setFriends] = useState<IPublicUser[]>([])

	const updateFeed = () => {
		return api.events.getFeed(token).then(res => setFeed(() => res.data))
	}

	const updateFriends = () => {
		return api.friends.getFriends(token).then(res => setFriends(res.data))
	}

	useFocusEffect(
		useCallback(() => {
			updateFeed()
			updateFriends()
		}, [])
	)
	return (
		<UICard
			title='Feed'
			withDivider={false}
		>
			{feed.length && friends.length
				? feed.map((feedEl, i, arr) => (
						<View key={feedEl.eventId}>
							<FeedElement
								feedElement={feedEl}
								user={friends.find(friend => friend.id === feedEl.userId)}
								style={[i !== arr.length - 1 && { marginBottom: 15 }]}
							/>
							{i !== arr.length - 1 && <UIDivider />}
						</View>
				  ))
				: null}
		</UICard>
	)
}
