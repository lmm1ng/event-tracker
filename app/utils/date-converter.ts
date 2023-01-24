import moment from 'moment'

// for backend

export const formatDate = (date: Date) => {
	return moment(date).format('YYYY-MM-DD') + 'T00:00:00.000+00:00'
}

// from backend
export const trimDate = (date: Date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')

	return `${year}-${month}-${day}`
}

export const fromNow = (date: string) => {
	return moment(date).from(moment())
}

export const dateString = ({
	date,
	variant = 'short'
}: {
	date: string | Date
	variant?: 'short' | 'full'
}) => {
	return moment(date).format(variant === 'short' ? 'D MMM YY' : 'DD MMMM YYYY')
}
