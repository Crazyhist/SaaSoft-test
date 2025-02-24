import { defineStore } from 'pinia'

interface Account {
	label: string
	type: 'LDAP' | 'Локальная'
	login: string
	password: string | null
}

export const useAccountStore = defineStore('accountStore', {})
