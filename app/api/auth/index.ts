import { IAuthResponse, ILoginRequest, IRegistrationRequest } from '@/api/auth/auth.models'
import { Token, request } from '@/api/request'
import { IUser } from '@/models/user'

export default {
	login(requestData: ILoginRequest) {
		return request<IAuthResponse>({
			url: 'api/v1/auth/login',
			method: 'POST',
			data: requestData
		})
	},
	register(requestData: IRegistrationRequest) {
		return request<IAuthResponse>({
			url: 'api/v1/auth/register',
			method: 'POST',
			data: requestData
		})
	},
	getMyProfile(token: Token) {
		return request<IUser>({
			url: 'api/v1/auth/user',
			token
		})
	}
}
