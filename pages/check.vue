<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="checkList"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            style="width: 100%"
        >
            <template #item.name="{item}">
                <v-text-field v-model="item.name" clearable></v-text-field>
            </template>
            <template #item.date="{item}">
                <v-text-field v-model="item.date" placeholder="YYYY/MM/DD" clearable></v-text-field>
            </template>
            <template #item.card="{item}">
                <v-checkbox v-model="item.card"></v-checkbox>
            </template>
            <template #item.first="{item}">
                <v-checkbox v-model="item.first"></v-checkbox>
            </template>
            <template #item.second="{item}">
                <v-checkbox v-model="item.second"></v-checkbox>
            </template>
            <template #item.third="{item}">
                <v-checkbox v-model="item.third"></v-checkbox>
            </template>
            <template #item.fourth="{item}">
                <v-checkbox v-model="item.fourth"></v-checkbox>
            </template>
            <template #item.fifth="{item}">
                <v-checkbox v-model="item.fifth"></v-checkbox>
            </template>
        </v-data-table>
        <v-btn elevation="3" fixed fab bottom right style="margin: 0 170px 30px 0" @click="save" v-if="modified">
            <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn elevation="3" fixed fab bottom right style="margin: 0 100px 30px 0" @click="restore" v-if="modified">
            <v-icon>mdi-restore</v-icon>
        </v-btn>
        <v-btn elevation="3" fixed fab bottom right style="margin: 0 30px 30px 0" @click="newCheck">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import CheckInterface from "~/interfaces/check";
import {DataTableHeader} from "vuetify";

@Component
export default class Check extends Vue {
    headers: Array<DataTableHeader> = [
        {text: '이름', value: 'name', width: '10vw'},
        {text: '등록일', value: 'date', width: '10vw'},
        {text: '복지카드', value: 'card', width: '5vw'},
        {text: '1st', value: 'first', width: '5vw'},
        {text: '2nd', value: 'second', width: '5vw'},
        {text: '3rd', value: 'third', width: '5vw'},
        {text: '4th', value: 'fourth', width: '5vw'},
        {text: '5th', value: 'fifth', width: '5vw'},
    ]
    sortBy: string = 'name'
    sortDesc: boolean = false
    checkList: Array<CheckInterface> = []

    newCheck() {
        this.checkList.push({} as CheckInterface)
    }

    save() {
        this.checkList = this.checkList.filter(item => item.name)
        this.$store.dispatch('updateCheck', JSON.parse(JSON.stringify(this.checkList)))
    }

    async restore() {
        this.checkList = JSON.parse(JSON.stringify(await this.$store.dispatch('getCheckList')))
    }

    get modified() {
        return JSON.stringify(this.checkList) != JSON.stringify(this.$store.getters.checkList)
    }

    async mounted() {
        this.checkList = JSON.parse(JSON.stringify(await this.$store.dispatch('getCheckList')))
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

