import { isLoginScreenFocused, navigate } from '@/utils/rootNavigation'
import { raiseError } from '@/utils/toast'
import type { RawAxiosRequestConfig } from 'axios'
import axios, { AxiosError } from 'axios'
import Constants from 'expo-constants'
import Toast from 'react-native-toast-message'

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
	(error: AxiosError) => {
		if (error?.response?.status === 401) {
			if (!isLoginScreenFocused()) {
				navigate('Login', undefined)
			}
		} else {
			raiseError({
				message: (error.response?.data as string | undefined) || 'Server error'
			})
		}

		return Promise.reject(error)
	}
)

export const request = <T>({ token = null, ...config }: IRequestProps): Promise<IResponse<T>> => {
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
