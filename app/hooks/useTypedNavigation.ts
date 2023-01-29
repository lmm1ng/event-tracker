import { RootRoutesParams } from '@/Entry'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export const useTypedNavigation = useNavigation<NavigationProp<RootRoutesParams>>
