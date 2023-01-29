import { THEME } from '@/theme/theme'
import { FC } from 'react'
import { ActivityIndicator } from 'react-native'

export const UILoader: FC = () => {
	return <ActivityIndicator color={THEME.primaryColor} />
}
