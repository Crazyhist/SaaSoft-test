import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type AccountType = 'LDAP' | 'Локальная'

export interface Label {
	text: string
}

export interface Account {
	id: number
	labels: Label[]
	labelsText?: string
	type: AccountType
	login: string
	password: string
}

export const useAccountStore = defineStore('accountStore', () => {
	const accounts = ref<Account[]>(
		JSON.parse(localStorage.getItem('accounts') || '[]')
	)

	const saveAccountsToStorage = () => {
		localStorage.setItem('accounts', JSON.stringify(accounts.value))
	}

	const addAccount = () => {
		accounts.value.push({
			id: Date.now(),
			labels: [],
			type: 'Локальная',
			login: '',
			password: '',
		})
		saveAccountsToStorage()
	}

	const removeAccount = (id: number) => {
		accounts.value = accounts.value.filter((account) => account.id !== id)
		saveAccountsToStorage()
	}

	const updateAccount = (id: number, data: Partial<Account>) => {
		const account = accounts.value.find((acc) => acc.id === id)
		if (account) {
			Object.assign(account, data)

			if (typeof data.labelsText === 'string') {
				account.labels = data.labelsText
					.split(';')
					.map((label) => ({ text: label.trim() }))
					.filter((label) => label.text)
			}
		}
		saveAccountsToStorage()
	}

	const validateAccount = (account: Account): boolean => {
		if (!account.login.trim() || account.login.length > 100) return false
		if (account.type === 'Локальная') {
			if (!account.password.trim() || account.password.length > 100)
				return false
		}
		return true
	}

	const validAccounts = computed(() => accounts.value.filter(validateAccount))

	return {
		accounts,
		validAccounts,
		addAccount,
		removeAccount,
		updateAccount,
		validateAccount,
	}
})
