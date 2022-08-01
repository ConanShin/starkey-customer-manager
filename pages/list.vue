<template>
    <v-row justify="center" style="margin-top: 0">
        <v-data-table
            :headers="headers"
            :items="filteredList"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @click:row="showDetail"
            style="width: 100%; margin: 0 5%;"
        >
            <template v-slot:top>
                <v-row style="margin-top: 20px" align="center" justify="center">
                    <v-text-field
                        label="검색어"
                        v-model="search"
                        @keyup.enter="filter"
                        style="width: 60%"
                        class="shrink mt-0 pt-0 mb-3"
                        clearable hide-details dense
                    ></v-text-field>
                    <v-btn icon @click="filter">
                        <v-icon >mdi-magnify</v-icon>
                    </v-btn>
                </v-row>
            </template>
            <template #item.address="{value}">{{value.length > 1 ? value : ''}}</template>
            <template #item.phoneNumber="{item}">
                <u v-if="item.phoneNumber.length > 8" @click.stop.prevent="call(item.phoneNumber)">{{item.phoneNumber}}</u>
            </template>
            <template #item.mobilePhoneNumber="{item}">
                <u v-if="item.mobilePhoneNumber.length > 8" @click.stop.prevent="call(item.mobilePhoneNumber)">{{item.mobilePhoneNumber}}</u>
            </template>
        </v-data-table>
    </v-row>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import {DataTableHeader} from "vuetify";
import UserInterface from "~/interfaces/user";

@Component
export default class List extends Vue {
    headers: Array<DataTableHeader> = [
        {text: '이름', value: 'name', width: '10vw'},
        {text: '주소', value: 'address', width: '30vw'},
        {text: '전화', value: 'phoneNumber', width: '10vw'},
        {text: '핸드폰', value: 'mobilePhoneNumber', width: '10vw'},
    ]
    list: Array<UserInterface> = []
    sortBy: string = 'name'
    sortDesc: boolean = false
    search: string = ''
    filterValue: string = ''

    async getUserList() {
        this.list = await this.$store.dispatch('getUserList')
    }

    get filteredList() {
        if (this.filterValue.length === 0) return this.list
        return this.list.filter(item => JSON.stringify(item).indexOf(this.filterValue) !== -1)
    }

    filter() {
        this.filterValue = this.search
    }

    showDetail(user: UserInterface) {
        this.$store.commit('selectedUser', user)
    }

    call(number: string) {
        location.href = "tel:" + number
    }

    beforeMount() {
        this.getUserList()
    }
}
</script>
<style>
.v-data-footer__select {
    display: none
}
.v-data-table-header-mobile {
    display: none
}
</style>
