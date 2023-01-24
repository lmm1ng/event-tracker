import { IPublicUser } from '@/models/user'

export interface IInvite {
	createdAt: string
	id: number
	user: IPublicUser
}
