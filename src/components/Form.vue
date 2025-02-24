<template>
	<v-container>
		<h2>Учетные записи</h2>
		<v-btn color="primary" @click="addAccount">+</v-btn>

		<v-alert type="info" class="mt-4">
			Для указания нескольких меток для одной пары логин/пароль используйте
			разделитель ;
		</v-alert>

		<v-form ref="form">
			<v-row v-for="(account, index) in accounts" :key="index" class="mt-3">
				<v-col cols="12" md="3">
					<v-text-field
						v-model="account.label"
						label="Метка"
						:rules="[(v) => !!v || 'Это поле обязательно']"
					/>
				</v-col>

				<v-col cols="12" md="2">
					<v-select
						v-model="account.type"
						label="Тип записи"
						:items="['LDAP', 'Локальная']"
					/>
				</v-col>

				<v-col cols="12" md="3">
					<v-text-field
						v-model="account.login"
						label="Логин"
						:rules="[(v) => !!v || 'Это поле обязательно']"
					/>
				</v-col>

				<v-col cols="12" md="3" v-if="account.type === 'LDAP'">
					<v-text-field
						v-model="account.password"
						label="Пароль"
						type="password"
						:rules="[(v) => !!v || 'Это поле обязательно']"
					/>
				</v-col>

				<v-col cols="12" md="1">
					<v-btn icon @click="removeAccount(index)">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const accounts = ref([
	{ label: '', type: 'Локальная', login: '', password: '' },
])

const removeAccount = (index: number) => {
	accounts.value.splice(index, 1)
}

const addAccount = () => {
	accounts.value.push({ label: '', type: 'Локальная', login: '', password: '' })
}
</script>
