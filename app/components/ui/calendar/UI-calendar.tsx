import { THEME } from '@/theme/theme'
import { FC } from 'react'
import {
	CalendarProps,
	Calendar as NativeCalender
} from 'react-native-calendars/src'

export const UICalendar: FC<CalendarProps> = props => {
	return (
		<NativeCalender
			{...props}
			style={[{ borderRadius: 20, padding: 5 }, props.style]}
			theme={{
				calendarBackground: THEME.inputBackgroundColor,
				textSectionTitleColor: THEME.primaryColor,
				monthTextColor: THEME.primaryColor,
				dayTextColor: THEME.textColor,
				textDisabledColor: THEME.disabledTextColor
			}}
		/>
	)
}
