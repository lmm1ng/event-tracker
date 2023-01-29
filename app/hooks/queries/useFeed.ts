import api from '@/api'
import { IFeedElementResponse } from '@/api/events/events.models'
import { AuthContext } from '@/hooks/useAuth'
import { IFeedElement } from '@/models/feed'
import { hashColor } from '@/utils/hash-color'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export const useFeed = () => {
	const { token } = useContext(AuthContext)
	return useQuery<IFeedElementResponse[], any, IFeedElement[]>(
		['feed'],
		() => api.events.getFeed(token).then(res => res.data),
		{
			initialData: [],
			select: feeds =>
				feeds.map(el => ({
					...el,
					eventTypeColor: hashColor(el.eventTypeId.toString())
				}))
		}
	)
}
