import { Token, request } from '@/api/request'
import { IInvite } from '@/models/invite'
import { IPublicUser, IUser } from '@/models/user'

export default {
	getFriends(token: Token) {
		return request<IPublicUser[]>({
			url: 'api/v1/friends',
			method: 'GET',
			token
		})
	},
	getInvites(token: Token) {
		return request<IInvite[]>({
			url: 'api/v1/friends/invites',
			method: 'GET',
			token
		})
	},
	invite(data: Pick<IUser, 'username'>, token: Token) {
		return request({
			url: 'api/v1/friends/invites',
			method: 'POST',
			data,
			token
		})
	},
	cancelInvite(data: Pick<IInvite, 'id'>, token: Token) {
		return request({
			url: `api/v1/friends/invites/${data.id}`,
			method: 'DELETE',
			token
		})
	},
	acceptInvite(data: Pick<IInvite, 'id'>, token: Token) {
		return request({
			url: `api/v1/friends/invites/${data.id}`,
			method: 'POST',
			token
		})
	}
}
