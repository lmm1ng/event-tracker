export interface ILoginRequest {
	username: string
	password: string
}

export interface ILoginResponse {
	createdAt: string
	deletedAt: string
	id: number
	session: string
	sessionHash: string
	updatedAt: string
	userId: number
}
