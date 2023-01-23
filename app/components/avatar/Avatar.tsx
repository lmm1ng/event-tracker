import { UserContext } from '@/hooks/useUser'
import { hashColor } from '@/utils/hash-color'
import { FC, useContext } from 'react'
import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle
} from 'react-native'

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
					<View
						style={{ ...styles.wrapper, ...((outerStyles || {}) as object) }}
					>
						<Text style={styles[`${size}DisplayName`]}>
							{user.displayedName}
						</Text>
						{/*TODO Avatar image*/}
						<View
							style={{
								...styles.imagePlaceholder,
								...styles[`${size}ImagePlaceholder`],
								backgroundColor: hashColor(user.displayedName)
							}}
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
		fontSize: 25
	},
	bigDisplayName: {
		fontSize: 35
	},
	imagePlaceholder: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10
	},
	normalImagePlaceholder: {
		width: 50,
		height: 50,
		borderRadius: 50
	},
	bigImagePlaceholder: {
		width: 70,
		height: 70,
		borderRadius: 70
	},
	placeholderText: {
		color: 'white'
	},
	normalPlaceholderText: {
		fontSize: 25
	},
	bigPlaceholderText: {
		fontSize: 35
	}
})
