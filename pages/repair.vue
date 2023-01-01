<template>
    <v-row justify="center" style="margin-top: 0">
        <v-data-table
            :headers="headers"
            :items="filteredList"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @click:row="showDetail"
            style="width: 100%; margin: 0 5%;"
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
            <template #item.recentRepair="{item}">
                {{latestRepairReport(item)}}
            </template>
            <template #item.phoneNumber="{item}">
                <u v-if="item.phoneNumber?.length > 8" @click.stop.prevent="call(item.phoneNumber)">{{item.phoneNumber}}</u>
            </template>
            <template #item.mobilePhoneNumber="{item}">
                <u v-if="item.mobilePhoneNumber?.length > 8" @click.stop.prevent="call(item.mobilePhoneNumber)">{{item.mobilePhoneNumber}}</u>
            </template>
        </v-data-table>
        <v-btn elevation="3" fixed fab bottom right style="margin: 0 30px 30px 0" @click="newRecord">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-row>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import {DataTableHeader} from "vuetify";
import RepairInterface from "~/interfaces/repair";

@Component
export default class Repair extends Vue {
    headers: Array<DataTableHeader> = [
        {text: '이름', value: 'name', width: '10vw'},
        {text: '가입일', value: 'registrationDate', width: '10vw'},
        {text: '최근 수리내역', value: 'recentRepair', width: '20vw'},
        {text: '핸드폰', value: 'mobilePhoneNumber', width: '10vw'},
        {text: '주소', value: 'address', width: '10vw'},
    ]
    sortBy: string = 'name'
    sortDesc: boolean = false
    search: string = ''
    filterValue: string = ''
    loading: boolean = true

    get filteredList() {
        const list = this.$store.getters.repairList
        if (list.length > 0) this.loading = false
        if (this.filterValue.length === 0) return list
        return list.filter((item: RepairInterface) => JSON.stringify({name: item.name}).indexOf(this.filterValue) !== -1)
    }

    latestRepairReport(repair: RepairInterface): string {
        let latestReportContent: string = ''
        let latestReportDate: string = ''
        if (repair.repairReport == undefined) return ''

        repair.repairReport.forEach(item => {
            if (latestReportDate === '') {
                latestReportDate = item.date
                latestReportContent = item.content
            } else {
                if (new Date(item.date).getTime() - new Date(latestReportDate).getTime() > 0) {
                    latestReportDate = item.date
                    latestReportContent = item.content
                }
            }
        })
        return latestReportContent
    }

    filter() {
        this.filterValue = this.search
    }

    newRecord() {
        this.$store.commit('selectedRepair', {
            id: new Date().getTime(),
            repairReport: []
        })
    }

    showDetail(repair: RepairInterface) {
        this.$store.commit('selectedRepair', repair)
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
</style>
