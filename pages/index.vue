<template>
    <div>
        <template v-if="step === 1">
            <v-row style="margin-top: 40vh" align="center" justify="center">
                <v-text-field
                    label="검색어"
                    v-model="search"
                    @keyup.enter="next"
                    style="width: 60%"
                    class="shrink mt-0 pt-0"
                    clearable hide-details dense
                ></v-text-field>
                <v-btn icon @click="next">
                    <v-icon >mdi-magnify</v-icon>
                </v-btn>
            </v-row>
        </template>
        <template v-if="step === 2">
            <v-row align="center" justify="center" style="margin: 20px 0 5px 0">
                <v-text-field
                    label="검색어"
                    v-model="search"
                    @keyup.enter="next"
                    style="width: 60%"
                    class="shrink mt-0 pt-0"
                    clearable hide-details dense
                ></v-text-field>
                <v-btn icon @click="next">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-row>
            <v-row v-masonry style="margin: 0 0 0 3%">
                <v-card
                    :key="item.id"
                    v-for="item in list"
                    width="45vw"
                    max-width="400px"
                    class="ma-1"
                    @click="showDetail(item)"
                    v-masonry-tile>
                    <v-card-text>
                        <h3>{{item.name}}</h3>
                        <div>{{item.address}}</div>
                        <u v-if="item.phoneNumber?.length > 8" @click.stop.prevent="call(item.phoneNumber)">{{item.phoneNumber}}</u>
                        <u v-if="item.mobilePhoneNumber?.length > 8" @click.stop.prevent="call(item.mobilePhoneNumber)">{{item.mobilePhoneNumber}}</u>
                    </v-card-text>
                </v-card>
            </v-row>
        </template>
    </div>
</template>
<script lang=ts>
import {Vue, Component, Watch} from 'vue-property-decorator'
import UserInterface from "~/interfaces/user"

@Component
export default class Home extends Vue {
    step: number = 1
    search: string = ''
    filterValue: string = ''

    get list() {
        if (this.filterValue.length === 0) {
            this.step = 1
            setTimeout(() => this.$store.commit('loading', false), 1000)
            return this.$store.getters.userList
        } else {
            const list = this.$store.getters.userList.filter((item: UserInterface) => JSON.stringify({name: item.name, address: item.address}).indexOf(this.filterValue) !== -1)
            setTimeout(() => this.$store.commit('loading', false), 1000)
            return list
        }
    }

    @Watch('search')
    searchFieldChanged(value: string | null) {
        if (value === null || value.length === 0) this.step = 1
    }

    async next() {
        this.$store.commit('loading', true)
        this.filterValue = this.search
        this.step = 2
        window.scrollTo(0, 0)
    }

    showDetail(user: UserInterface) {
        this.$store.commit('selectedUser', user)
    }

    call(number: string) {
        location.href = "tel:" + number
    }
}
</script>

