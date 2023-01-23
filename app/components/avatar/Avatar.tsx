import { Text } from '@/components/ui/text/Text'
import { UserContext } from '@/hooks/useUser'
import { THEME } from '@/theme/theme'
import { hashColor } from '@/utils/hash-color'
import { FC, useContext } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface IAvatarProps {
	onPress?: () => void
	styles?: StyleProp<ViewStyle>
	size?: 'normal' | 'big'
}

export const Avatar: FC<IAvatarProps> = ({
	onPress,
	styles: outerStyles,
	size = 'normal'
}) => {
	const { user } = useContext(UserContext)
	return (
		<>
			{user ? (
				<Pressable onPress={() => onPress && onPress()}>
					<View style={[styles.wrapper, outerStyles]}>
						<Text style={styles[`${size}DisplayName`]}>
							{user.displayedName}
						</Text>
						{/*TODO Avatar image*/}
						<View
							style={[
								styles.imagePlaceholder,
								styles[`${size}ImagePlaceholder`],
								{ backgroundColor: hashColor(user.displayedName) }
							]}
						>
							<Text
								style={{
									...styles.placeholderText,
									...styles[`${size}PlaceholderText`]
								}}
							>
								{user.displayedName[0].toUpperCase()}
							</Text>
						</View>
					</View>
				</Pressable>
			) : null}
		</>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	normalDisplayName: {
		fontSize: THEME.fontSizeHeader
	},
	bigDisplayName: {
		fontSize: THEME.fontSizeHeader + 10
	},
	imagePlaceholder: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10
	},
	normalImagePlaceholder: {
		width: THEME.fontSizeHeader + 20,
		height: THEME.fontSizeHeader + 20,
		borderRadius: THEME.fontSizeHeader + 20
	},
	bigImagePlaceholder: {
		width: THEME.fontSizeHeader + 40,
		height: THEME.fontSizeHeader + 40,
		borderRadius: THEME.fontSizeHeader + 40,
	},
	placeholderText: {
		color: 'white'
	},
	normalPlaceholderText: {
		fontSize: THEME.fontSizeHeader + 5
	},
	bigPlaceholderText: {
		fontSize: THEME.fontSizeHeader + 10
	}
})
