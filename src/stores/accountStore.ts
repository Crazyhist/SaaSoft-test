import { defineStore } from 'pinia'

interface Account {
	label: { text: string }[]
	type: 'LDAP' | 'Локальная'
	login: string
	password: string | null
}

export const useAccountStore = defineStore('accountStore', {
	state: () => ({
		accounts: [] as Account[],
	}),
})
