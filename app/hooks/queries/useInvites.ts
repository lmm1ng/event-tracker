import api from '@/api'
import { AuthContext } from '@/hooks/useAuth'
import { IInvite } from '@/models/invite'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export const useInvites = () => {
	const { token } = useContext(AuthContext)

	return useQuery<IInvite[]>(
		['invites'],
		() => api.friends.getInvites(token).then(res => res.data),
		{ initialData: [] }
	)
}
