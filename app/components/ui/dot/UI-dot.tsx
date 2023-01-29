import { FC } from 'react'
import { View, ViewProps } from 'react-native'

interface IUIDotProps extends ViewProps {
	size: number
	color: string
}

export const UIDot: FC<IUIDotProps> = ({ size, color, style: outerStyle }) => {
	return (
		<View
			style={[
				{
					width: size,
					height: size,
					borderRadius: size,
					backgroundColor: color
				},
				outerStyle
			]}
		/>
	)
}
