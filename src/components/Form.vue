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
			<v-row v-for="(account, index) in accounts" :key="index" class="mt-3">
				<v-col cols="12" md="3">
					<v-text-field
						v-model="account.label"
						label="Метка"
						:rules="[(v) => !!v || 'Это поле обязательно']"
						outlined
						dense
					/>
				</v-col>

				<v-col cols="12" md="2">
					<v-select
						v-model="account.type"
						label="Тип записи"
						:items="['LDAP', 'Локальная']"
						:rules="[(v) => !!v || 'Выберите тип записи']"
						outlined
						dense
					/>
				</v-col>

				<v-col cols="12" md="3">
					<v-text-field
						v-model="account.login"
						label="Логин"
						:rules="[
							(v) => !!v || 'Это поле обязательно',
							(v) => (v && v.length <= 100) || 'Максимум 100 символов',
						]"
						outlined
						dense
					/>
				</v-col>

				<v-col cols="12" md="3" v-if="account.type === 'Локальная'">
					<v-text-field
						v-model="account.password"
						label="Пароль"
						type="password"
						:rules="[
							(v) => !!v || 'Это поле обязательно',
							(v) => (v && v.length <= 100) || 'Максимум 100 символов',
						]"
						outlined
						dense
					/>
				</v-col>

				<v-col cols="12" md="1">
					<v-btn icon @click="removeAccount(index)"> Х </v-btn>
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

const valid = ref(false)

const removeAccount = (index: number) => {
	accounts.value.splice(index, 1)
}

const addAccount = () => {
	accounts.value.push({ label: '', type: 'Локальная', login: '', password: '' })
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
