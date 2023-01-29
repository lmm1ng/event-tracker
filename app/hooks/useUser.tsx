import { IUser } from '@/models/user'
import { ReactNode, createContext, useState } from 'react'

interface IInitialContext {
	user: IUser | null
	setUser: (user: IUser | null) => void
}

const initialContext = {
	user: null,
	setUser: () => {}
}

export const UserContext = createContext<IInitialContext>(initialContext)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null)

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
