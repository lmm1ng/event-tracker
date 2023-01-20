import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = (name, params) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params)
	}
}

export const isLoginScreenFocused = (): boolean => {
	if (navigationRef.isReady()) {
		return navigationRef.getCurrentRoute()?.name === 'Login'
	}
	return false
}