export interface ILoginRequest {
	username: string
	password: string
}

export interface IAuthResponse {
	createdAt: string
	deletedAt: string
	id: number
	session: string
	sessionHash: string
	updatedAt: string
	userId: number
}

export interface IRegistrationRequest {
	displayedName: string
	username: string
	password: string
}
