<template>
    <div>
        <template v-if="step === 1">
            <v-card color="transparent" style="margin-top: 30vh; text-align: center;">
                <v-text-field
                    label="검색어"
                    v-model="search"
                    @keyup.enter="next"
                    hide-details
                    class="d-inline-flex"
                ></v-text-field>
                <v-btn icon @click="next">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-card>
        </template>
        <template v-if="step === 2">
            <v-card color="transparent" style="text-align: center">
                <v-text-field
                    label="검색어"
                    v-model="search"
                    @keyup.enter="next"
                    hide-details
                    class="d-inline-flex"
                ></v-text-field>
                <v-btn icon @click="next">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-card>
            <v-row v-masonry style="margin: 10px 0 0 3%">
                <v-card :key="item.id" v-for="item in list" width="45vw" max-width="400px" class="ma-1" v-masonry-tile>
                    <v-card-text>
                        {{item.name}}<br/>
                        {{item.address}}<br/>
                        <a v-if="item.phoneNumber.length > 8" :href='"tel:" + item.phoneNumber'>{{item.phoneNumber}}</a><br/>
                        <a v-if="item.mobilePhoneNumber.length > 8" :href='"tel:" + item.mobilePhoneNumber'>{{item.mobilePhoneNumber}}</a>
                    </v-card-text>
                </v-card>
            </v-row>
        </template>
    </div>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import UserInterface from "~/interfaces/user"

@Component
export default class Home extends Vue {
    step: number = 1
    list: Array<UserInterface> = []
    search: string = ''

    async next() {
        if (this.search.length === 0) return;
        this.list = []
        this.$forceUpdate()
        const list: Array<UserInterface> = await this.$store.dispatch('getUserList')
        this.list = list.filter(item => JSON.stringify(item).indexOf(this.search) !== -1)
        this.step = 2
        this.$forceUpdate()
    }
}
</script>

