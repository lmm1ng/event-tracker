import moment from 'moment'

// for backend
export const formatDate = (date: Date) => {
	return moment(date).format('YYYY-MM-DD') + 'T00:00:00Z'
}

// from backend
export const trimDate = (date: Date) => {
	return moment(date).format('YYYY-MM-DD')
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
