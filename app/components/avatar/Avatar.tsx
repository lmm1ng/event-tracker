import { Text } from '@/components/ui/text/Text'
import { IPublicUser } from '@/models/user'
import { THEME } from '@/theme/theme'
import { hashColor } from '@/utils/hash-color'
import { FC } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface IAvatarProps {
	onPress?: () => void
	styles?: StyleProp<ViewStyle>
	size?: 'normal' | 'big' | 'small'
	user: IPublicUser | null
	nameFirst?: boolean
	subtext?: string
}

export const Avatar: FC<IAvatarProps> = ({
	onPress,
	styles: outerStyles,
	size = 'normal',
	user,
	nameFirst = true,
	subtext = ''
}) => {
	return (
		<>
			{user ? (
				<Pressable onPress={() => onPress && onPress()}>
					<View style={[styles.wrapper, outerStyles]}>
						{nameFirst ? (
							<View style={{ marginRight: 10 }}>
								<Text style={[styles[`${size}DisplayName`]]}>
									{user.displayedName}
								</Text>
								{subtext && <Text style={styles.subtext}>{subtext}</Text>}
							</View>
						) : null}
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
						{!nameFirst ? (
							<View style={{ marginLeft: 10 }}>
								<Text style={[styles[`${size}DisplayName`]]}>
									{user.displayedName}
								</Text>
								{subtext && <Text style={styles.subtext}>{subtext}</Text>}
							</View>
						) : null}
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
		alignItems: 'center'
	},

	subtext: {
		fontSize: THEME.fontSizeSmall
	},

	smallDisplayName: {
		fontSize: THEME.fontSizeRegular
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
		justifyContent: 'center'
	},

	smallImagePlaceholder: {
		width: THEME.fontSizeHeader + 10,
		height: THEME.fontSizeHeader + 10,
		borderRadius: THEME.fontSizeHeader + 10
	},
	normalImagePlaceholder: {
		width: THEME.fontSizeHeader + 20,
		height: THEME.fontSizeHeader + 20,
		borderRadius: THEME.fontSizeHeader + 20
	},
	bigImagePlaceholder: {
		width: THEME.fontSizeHeader + 40,
		height: THEME.fontSizeHeader + 40,
		borderRadius: THEME.fontSizeHeader + 40
	},

	placeholderText: {
		color: 'white'
	},

	smallPlaceholderText: {
		fontSize: THEME.fontSizeHeader
	},
	normalPlaceholderText: {
		fontSize: THEME.fontSizeHeader + 5
	},
	bigPlaceholderText: {
		fontSize: THEME.fontSizeHeader + 10
	}
})
