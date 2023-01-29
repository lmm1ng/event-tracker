import * as SecureStore from 'expo-secure-store'

export const save = (key: string, value: string | Record<string, string>) => {
	return SecureStore.setItemAsync(key, typeof value === 'string' ? value : JSON.stringify(value))
}

export const get = (key: string): Promise<string | null> => {
	return SecureStore.getItemAsync(key)
}

export const deleteKey = (key: string) => {
	return SecureStore.deleteItemAsync(key)
}
