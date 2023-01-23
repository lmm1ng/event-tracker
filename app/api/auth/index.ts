import { ILoginRequest, ILoginResponse } from '@/api/auth/auth.models'
import { Token, request } from '@/api/request'
import { IUser } from '@/models/user'

export default {
	login(requestData: ILoginRequest) {
		return request<ILoginResponse>({
			url: 'api/v1/auth/login',
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
