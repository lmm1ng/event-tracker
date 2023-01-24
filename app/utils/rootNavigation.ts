import { RootRoutesParams } from '@/Entry'
import {
	NavigationContainerEventMap,
	NavigationContainerRef,
	createNavigationContainerRef
} from '@react-navigation/native'

export const navigationRef =
	createNavigationContainerRef<NavigationContainerRef<RootRoutesParams>>()

export const navigate = <T extends keyof RootRoutesParams>(
	name: T,
	params: RootRoutesParams[T]
) => {
	if (navigationRef.isReady()) {
		// @ts-ignore
		navigationRef.navigate(name, params)
	}
}

export const isLoginScreenFocused = (): boolean => {
	if (navigationRef.isReady()) {
		return navigationRef.getCurrentRoute()?.name === 'Login'
	}
	return false
}
