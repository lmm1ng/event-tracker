import Toast from 'react-native-toast-message'

interface IRaiseToastArgs {
	title?: string
	message: string
}

export const raiseError = ({ title = 'Error', message }: IRaiseToastArgs) => {
	Toast.show({
		type: 'error',
		text1: title,
		text2: message,
		position: 'bottom'
	})
}

export const raiseSuccess = ({
	title = 'Success',
	message
}: IRaiseToastArgs) => {
	Toast.show({
		type: 'success',
		text1: title,
		text2: message,
		position: 'bottom'
	})
}
