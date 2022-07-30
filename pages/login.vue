<template>
    <v-row justify="center" align="center">
        <v-form ref="form" v-model="isValid" lazy-validation>
            <v-text-field
                v-model="credential.email"
                :rules="emailRules"
                label="Email"
                style="width: 200px"
                required
            ></v-text-field>
            <v-text-field
                v-model="credential.password"
                :rules="nullSafetyRules"
                label="Password"
                type="password"
                class="mb-2"
                style="width: 200px"
                required
            ></v-text-field>
            <v-btn dark @click="login" width="200">Login</v-btn>
            <v-checkbox label="Remember Me" v-model="rememberMe"></v-checkbox>
        </v-form>
    </v-row>
</template>

<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import CredentialInterface from "~/interfaces/credential";

@Component
export default class Login extends Vue {
    isValid: boolean = true
    rememberMe: boolean = false
    credential: CredentialInterface = {
        email: '',
        password: ''
    }

    nullSafetyRules: Array<(a: string) => string | boolean> = [
        v => !!v || 'Password is required'
    ]
    emailRules: Array<(a: string) => string | boolean> = [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
    ]

    async login() {
        const isValid = (this.$refs.form! as any).validate()
        if (isValid) {
            try {
                await this.$store.dispatch('login', this.credential)
                this.storeInLocalStorage(this.rememberMe)
                this.$router.push('/').catch(null)
            } catch (e) {
                this.$store.commit('toast', '사용자 정보가 유효하지 않습니다.')
            }
        }
    }

    storeInLocalStorage(remember: boolean) {
        if (remember) {
            localStorage.setItem('email', this.credential.email)
            localStorage.setItem('password', this.credential.password)
        } else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }
    }

    beforeMount() {
        const email = localStorage.getItem('email')
        if (email) {
            console.log(email)
            const password = localStorage.getItem('password')
            this.credential.email = email
            this.credential.password = password
            this.rememberMe = true
        } else {
            this.rememberMe = false
        }
    }
}
</script>
<style scoped lang="scss">
</style>
