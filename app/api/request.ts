import axios, { AxiosHeaders } from 'axios'
import type { RawAxiosRequestConfig } from 'axios'
import Constants from 'expo-constants'

import { isLoginScreenFocused, navigate } from '@/utils/rootNavigation'

export type Token = string | null

interface IRequestProps extends RawAxiosRequestConfig {
	token?: Token
}

interface IResponse<T> {
	data: T
}

axios.interceptors.response.use((response) => {
	return response
}, (error) => {
	if (error?.response?.status === 401) {
		if (!isLoginScreenFocused()) {
			navigate('Login', {})
		}
	}

	return Promise.reject(error)
})

export const request = <T>({ token = null, ...config }: IRequestProps): Promise<IResponse<T>> => {
	return axios.request<never, T>({
		...config,
		url: Constants.expoConfig.extra.apiUrl + config.url,
		headers: token ? {
			Authorization: `Bearer ${token}`
		} as AxiosHeaders : undefined
	})
}