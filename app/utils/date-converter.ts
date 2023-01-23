// for backend
export const formatDate = (date: Date) => {
	return date.toISOString().replace('Z', '+03:00')
}

// from backend
export const trimDate = (date: Date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')

	return `${year}-${month}-${day}`
}
