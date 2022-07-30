<template>
    <v-app dark>
        <v-navigation-drawer
            v-if="isNotLoginPage"
            v-model="drawer"
            :clipped="clipped"
            fixed
            app
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
            fixed
            app
        >
            <v-app-bar-nav-icon v-if="isNotLoginPage" @click.stop="drawer = !drawer"/>
            <v-spacer></v-spacer>
            <v-toolbar-title v-text="title"/>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <v-container class="fill-height">
                <Nuxt/>
            </v-container>
            <v-snackbar dark :value="!!toastMessage" :timeout="20000">{{toastMessage}}</v-snackbar>
        </v-main>
    </v-app>
</template>

<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'

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
        {icon: 'mdi-apps', title: 'Welcome', to: '/'},
        {icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire'}
    ]

    get isNotLoginPage() {
        return this.$router.currentRoute.name !== 'login'
    }

    get toastMessage() {
        return this.$store.getters.toast
    }
}
</script>

<style lang="scss">
.v-snack__content {
    text-align: center;
}
</style>
