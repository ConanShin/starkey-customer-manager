<template>
    <v-row justify="center" style="margin-top: 0">
        <v-data-table
            :headers="headers"
            :items="filteredList"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @click:row="showDetail"
            style="width: 100%; margin: 0 5%; background: transparent;"
            :loading="loading"

        >
            <template v-slot:top>
                <v-row style="margin-top: 20px; margin-bottom: 20px" align="center" justify="center">
                    <v-text-field
                        label="검색어"
                        v-model="search"
                        @keyup.enter="filter"
                        style="width: 60%"
                        class="shrink mt-0 pt-0"
                        clearable hide-details dense
                    ></v-text-field>
                    <v-btn icon @click="filter">
                        <v-icon >mdi-magnify</v-icon>
                    </v-btn>
                </v-row>
            </template>
            <template #item.address="{value}">{{value?.length > 1 ? value : ''}}</template>
            <template #item.phoneNumber="{item}">
                <u v-if="item.phoneNumber?.length > 8" @click.stop.prevent="call(item.phoneNumber)">{{item.phoneNumber}}</u>
            </template>
            <template #item.mobilePhoneNumber="{item}">
                <u v-if="item.mobilePhoneNumber?.length > 8" @click.stop.prevent="call(item.mobilePhoneNumber)">{{item.mobilePhoneNumber}}</u>
            </template>
        </v-data-table>
        <v-btn elevation="3" fixed fab bottom right style="margin: 0 30px 30px 0" @click="newUser">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
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
        {text: '가입일', value: 'registrationDate', width: '7vw'},
        {text: '주소', value: 'address', width: '30vw'},
        {text: '전화', value: 'phoneNumber', width: '10vw'},
        {text: '핸드폰', value: 'mobilePhoneNumber', width: '10vw'},
    ]
    sortBy: string = 'name'
    sortDesc: boolean = false
    search: string = ''
    filterValue: string = ''
    loading: boolean = true

    get filteredList() {
        const list = this.$store.getters.userList
        if (list.length > 0) this.loading = false
        if (!this.filterValue) return list
        return list
            .filter((item: UserInterface) => JSON.stringify({
                name: item.name,
                address: item.address,
                regDate: item.registrationDate,
                aidDate: item.hearingAid
            }).indexOf(this.filterValue) !== -1)
    }

    filter() {
        this.filterValue = this.search
    }

    newUser() {
        this.$store.commit('selectedUser', {
            id: new Date().getTime(),
            hearingAid: []
        })
    }

    showDetail(user: UserInterface) {
        this.$store.commit('selectedUser', user)
    }

    call(number: string) {
        location.href = "tel:" + number
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
table th + th { border-left:1px solid #dddddd; }
table td + td { border-left:1px solid #dddddd; }

tbody tr:nth-of-type(5n) .text-start, tbody tr:nth-of-type(5n) {
    border-bottom: 5px #0d47a1 solid !important;
}

input::placeholder {
    opacity: 0.5;
}
</style>
