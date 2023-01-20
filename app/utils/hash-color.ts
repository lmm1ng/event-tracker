import { MD5 } from '@/utils/md5'

export const hashColor = (str: string) => {
	return `#${MD5(str).slice(0, 6)}`
}