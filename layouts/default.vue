<template>
    <v-app style="overflow-x: hidden;">
        <v-navigation-drawer
            v-if="!isLoginPage"
            v-model="drawer"
            :clipped="clipped"
            fixed app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            color="primary"
            fixed
            app
        >
            <v-app-bar-nav-icon v-if="!isLoginPage" @click.stop="drawer = !drawer"/>
            <v-spacer></v-spacer>
            <v-toolbar-title v-text="title"/>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main style="overflow-y: hidden;">
            <Nuxt/>
            <user-detail-dialog></user-detail-dialog>
            <repair-detail-dialog></repair-detail-dialog>
            <popup></popup>
            <v-snackbar :value="!!toastMessage" :timeout="20000">{{toastMessage}}</v-snackbar>
            <v-overlay :value="$store.getters['loading']">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </v-main>
    </v-app>
</template>

<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import firebase from '~/plugins/firebase'

interface Route {
    icon: string
    title: string
    to: string
}

@Component
export default class DefaultLayout extends Vue {
    title: string = 'Starkey Customer Manager'
    clipped: boolean = false
    drawer: boolean = false
    items: Array<Route> = [
        {icon: 'mdi-magnify', title: '홈', to: '/notice'},
        {icon: 'mdi-format-list-bulleted', title: '리스트', to: '/list'},
        {icon: 'mdi-tools', title: '수리', to: '/repair'},
        {icon: 'mdi-checkbox-multiple-outline', title: '뭐였더라', to: '/check'},
    ]
    isLoginPage: boolean = true

    get toastMessage() {
        return this.$store.getters.toast
    }

    beforeMount() {
        firebase.auth().onAuthStateChanged(async currentUser => {
            console.log(this.$router.currentRoute.name, currentUser)
            if (currentUser) {
                this.isLoginPage = false
                this.$router.currentRoute.name === 'index' && await this.$router.replace({name: 'notice'})
                this.$store.dispatch('getUserList').then()
                this.$store.dispatch('getRepairList').then()
            } else {
                this.isLoginPage = true
                this.$router.currentRoute.name !== 'index' && await this.$router.replace({name: 'index'})
            }
        })
    }
}
</script>

<style lang="scss">
.v-snack__content {
    text-align: center;
}
</style>
