<template>
	<v-container>
		<h2 class="text-center">Учетные записи</h2>
		<v-btn color="primary" @click="addAccount" class="mb-4"
			>Добавить запись</v-btn
		>

		<v-alert type="info" class="mt-4">
			Для указания нескольких меток для одной пары логин/пароль используйте
			разделитель ;
		</v-alert>

		<v-form ref="form" v-model="valid" lazy-validation>
			<v-row v-for="account in accounts" :key="account.id" class="mt-3">
				<v-col cols="12" md="3">
					<v-text-field
						v-model="account.labelsText"
						label="Метка"
						:rules="[(v) => (v && v?.length <= 50) || 'Максимум 50 символов']"
						maxlength="50"
						outlined
						dense
						@blur="updateAccount(account)"
					/>
				</v-col>

				<v-col cols="12" md="2">
					<v-select
						v-model="account.type"
						label="Тип записи"
						:items="['LDAP', 'Локальная']"
						outlined
						dense
						@update:modelValue="updateAccount(account)"
					/>
				</v-col>

				<v-col cols="12" md="3">
					<v-text-field
						v-model="account.login"
						label="Логин"
						:rules="[
							(v) => !!v || 'Это поле обязательно',
							(v) => v?.length <= 100 || 'Максимум 100 символов',
						]"
						maxlength="100"
						outlined
						dense
						@blur="updateAccount(account)"
					/>
				</v-col>

				<v-col cols="12" md="3" v-if="account.type === 'Локальная'">
					<v-text-field
						v-model="account.password"
						label="Пароль"
						type="password"
						:rules="[
							(v) => !!v || 'Это поле обязательно',
							(v) => v?.length <= 100 || 'Максимум 100 символов',
						]"
						maxlength="100"
						outlined
						dense
						@blur="updateAccount(account)"
					/>
				</v-col>

				<v-col cols="12" md="1">
					<v-btn icon @click="removeAccount(account.id)"> Х </v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useAccountStore, type Account } from '../stores/accountStore'

onMounted(() => {
	console.log('Аккаунты в сторе:', accountStore.accounts)
})

interface AccountForm extends Account {
	labelsText: string
}

const accountStore = useAccountStore()

const valid = ref(false)

const accounts = computed(() =>
	accountStore.accounts.map((acc) => ({
		...acc,
		labelsText: (acc.labels || []).map((label) => label.text).join('; '),
	}))
)

const addAccount = () => {
	accountStore.addAccount()
}

const removeAccount = (id: number) => {
	accountStore.removeAccount(id)
}

const updateAccount = (account: AccountForm) => {
	accountStore.updateAccount(account.id, {
		labelsText: account.labelsText,
		type: account.type,
		login: account.login,
		password: account.password,
	})
}
</script>

<style scoped>
.text-center {
	text-align: center;
}

.v-row {
	padding: 10px;
}

.v-text-field,
.v-select {
	max-width: 100%;
}

.v-btn[disabled] {
	opacity: 0.5;
}

.v-alert {
	background-color: #f0f0f0;
	border-left: 5px solid #00bcd4;
}
</style>
