export interface IPublicUser {
	id: number
	displayedName: string
	profileImage: string
}

export interface IUser extends IPublicUser {
	createdAt: string
	deletedAt: string
	email: string
	updatedAt: string
	username: string
}
