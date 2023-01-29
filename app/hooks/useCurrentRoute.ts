import { navigationRef } from '@/utils/rootNavigation'
import { NavigationContainerEventMap } from '@react-navigation/native'
import { useEffect, useState } from 'react'

export const useCurrentRoute = () => {
	const [currentRoute, setCurrentRoute] = useState('')

	const setRouteCallback = (ev: NavigationContainerEventMap['__unsafe_action__']) => {
		if (ev?.data?.action?.type === 'NAVIGATE') {
			// @ts-ignore
			setCurrentRoute(ev?.data?.action?.payload?.name || '')
		}
	}

	useEffect(() => {
		setCurrentRoute(navigationRef.getCurrentRoute()?.name || 'Home')

		navigationRef.addListener('__unsafe_action__', setRouteCallback)

		return () => navigationRef.removeListener('__unsafe_action__', setRouteCallback)
	})

	return currentRoute
}
