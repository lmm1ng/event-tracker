import api from '@/api'
import { AuthContext } from '@/hooks/useAuth'
import { IPublicUser } from '@/models/user'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export const useFriends = () => {
	const { token } = useContext(AuthContext)
	return useQuery<IPublicUser[]>(
		['friends'],
		() => api.friends.getFriends(token).then(res => res.data),
		{ initialData: [] }
	)
}
