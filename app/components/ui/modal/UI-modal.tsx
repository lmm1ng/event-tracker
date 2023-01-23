import { UIButton } from '@/components/ui/button/UI-button'
import { UICard } from '@/components/ui/card/UI-card'
import { Text } from '@/components/ui/text/Text'
import { THEME } from '@/theme/theme'
import { FC } from 'react'
import {
	GestureResponderEvent,
	Modal,
	ModalProps,
	Pressable,
	StyleSheet,
	View
} from 'react-native'

interface IUIModalProps extends ModalProps {
	show: boolean
	title?: string
	onClose: () => void
	onSubmit?: () => void
	withButtons?: boolean
}

export const UIModal: FC<IUIModalProps> = ({
	show,
	title = '',
	onClose,
	onSubmit,
	children,
	withButtons = false,
	...props
}) => {
	const onBackdropClick = (e: GestureResponderEvent) => {
		if (e.currentTarget === e.target) {
			onClose()
		}
	}
	return (
		<Modal
			transparent
			visible={show}
			animationType='fade'
			{...props}
		>
			<Pressable
				style={[styles.wrapper]}
				onPress={e => onBackdropClick(e)}
			>
				<View style={styles.content}>
					<UICard
						style={{
							paddingHorizontal: 30,
							paddingBottom: 30,
							paddingTop: 15,
							backgroundColor: THEME.screenBackgroundColor
						}}
					>
						{title ? <Text style={styles.title}>{title}</Text> : null}
						{children}
						{withButtons ? (
							<View style={styles.buttons}>
								<UIButton
									text={'Cancel'}
									variant='secondary'
									style={{ width: '45%' }}
									onPress={() => onClose()}
								/>
								<UIButton
									text={'Submit'}
									style={{ width: '45%' }}
									onPress={() => onSubmit && onSubmit()}
								/>
							</View>
						) : null}
					</UICard>
				</View>
			</Pressable>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		flex: 1,
		minWidth: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,.5)'
	},
	title: {
		fontSize: THEME.fontSizeHeader,
		textAlign: 'center',
		marginBottom: 10
	},
	content: {
		width: '80%'
	},
	buttons: {
		width: '100%',
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
