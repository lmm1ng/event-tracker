import api from '@/api'
import { IEventTypeResponse } from '@/api/events/events.models'
import { AuthContext } from '@/hooks/useAuth'
import { IEventType } from '@/models/eventType'
import { hashColor } from '@/utils/hash-color'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export const useEventTypes = () => {
	const { token } = useContext(AuthContext)
	return useQuery<IEventTypeResponse[], any, IEventType[]>(
		['eventTypes'],
		() => api.events.getEventTypes(token).then(res => res.data),
		{
			initialData: [],
			select: eventTypes => eventTypes.map(el => ({ ...el, color: hashColor(el.id.toString()) }))
		}
	)
}
