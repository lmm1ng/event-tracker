import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { deleteKey, get, save } from '@/utils/secure-store'

interface IInitialContext {
	isAuth: boolean
	token: string | null
	login: (token: string) => void
	logout: () => void
}

const initialContext = {
	isAuth: false,
	token: null,
	login: () => {},
	logout: () => {}
}

export const AuthContext = createContext<IInitialContext>(initialContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		get('token').then(token => {
			setToken(token)
		})
	}, [])

	useEffect(() => {
		if (token !== null) {
			save('token', token)
		}
	}, [token])

	const isAuth = useMemo(() => token !== null, [token])

	const login = (token: string) => {
		setToken(token)
	}

	const logout = () => {
		setToken(null)
		deleteKey('token')
	}

	return (
		<AuthContext.Provider value={{ isAuth, login, token, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
