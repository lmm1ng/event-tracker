import { isLoginScreenFocused, navigate } from '@/utils/rootNavigation'
import type { RawAxiosRequestConfig } from 'axios'
import axios from 'axios'
import Constants from 'expo-constants'

export type Token = string | null

interface IRequestProps extends RawAxiosRequestConfig {
	token?: Token
}

interface IResponse<T> {
	data: T
	meta?: {
		total?: number
		limit?: number
		page?: number
	}
}

axios.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		if (error?.response?.status === 401) {
			if (!isLoginScreenFocused()) {
				navigate('Login', undefined)
			}
		}

		return Promise.reject(error)
	}
)

export const request = <T>({
	token = null,
	...config
}: IRequestProps): Promise<IResponse<T>> => {
	return axios.request<never, IResponse<T>>({
		...config,
		url: (Constants.expoConfig?.extra?.apiUrl || '') + config.url,
		headers: token
			? {
					Authorization: `Bearer ${token}`
			  }
			: undefined
	})
}
