import { ILoginRequest, ILoginResponse } from '@/api/auth/auth.models'
import { request } from '@/api/request'

export default {
	login(requestData: ILoginRequest) {
		return request<ILoginResponse>({
			url: 'api/v1/auth/login',
			method: 'POST',
			data: requestData
		})
	}
}
