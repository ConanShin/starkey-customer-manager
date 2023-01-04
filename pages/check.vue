<template>
    <v-row justify="center" style="margin-top: 0">
        <v-data-table
            :headers="headers"
            :items="checkList"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            item-key="index"
            disable-pagination
            style="width: 100%; margin: 0 5%; background: transparent;"
        >
            <template #item.name="{item}">
                <v-text-field v-model="item.name" clearable></v-text-field>
            </template>
            <template #item.date="{item}">
                <v-text-field v-model="item.date" placeholder="YYYY/MM/DD" clearable></v-text-field>
            </template>
            <template #item.support="{item}">
                <v-checkbox v-model="item.support"></v-checkbox>
            </template>
            <template #item.health="{item}">
                <v-checkbox v-model="item.health"></v-checkbox>
            </template>
            <template #item.first="{item}">
                <v-text-field v-model="item.first" placeholder="YYYY/MM/DD" clearable></v-text-field>
            </template>
            <template #item.second="{item}">
                <v-text-field v-model="item.second" placeholder="YYYY/MM/DD" clearable></v-text-field>
            </template>
            <template #item.third="{item}">
                <v-text-field v-model="item.third" placeholder="YYYY/MM/DD" clearable></v-text-field>
            </template>
            <template #item.fourth="{item}">
                <v-text-field v-model="item.fourth" placeholder="YYYY/MM/DD" clearable></v-text-field>
            </template>
            <template #item.fifth="{item}">
                <v-text-field v-model="item.fifth" placeholder="YYYY/MM/DD" clearable></v-text-field>
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
    </v-row>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import CheckInterface from "~/interfaces/check";
import {DataTableHeader} from "vuetify";

@Component
export default class Check extends Vue {
    headers: Array<DataTableHeader> = [
        {text: '이름', value: 'name', sortable: false, width: '5vw'},
        {text: '등록일', value: 'date', sortable: false, width: '7vw'},
        {text: '수급대상', value: 'support', sortable: false, width: '4vw'},
        {text: '건보대상', value: 'health', sortable: false, width: '4vw'},
        {text: '1차', value: 'first', sortable: false, width: '7vw'},
        {text: '2차', value: 'second', sortable: false, width: '7vw'},
        {text: '3차', value: 'third', sortable: false, width: '7vw'},
        {text: '4차', value: 'fourth', sortable: false, width: '7vw'},
        {text: '5차', value: 'fifth', sortable: false, width: '7vw'},
    ]
    sortBy: string = ''
    sortDesc: boolean = false
    checkList: Array<CheckInterface> = []

    newCheck() {
        this.checkList.unshift({} as CheckInterface)
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
table th + th { border-left:1px solid #dddddd; }
table td + td { border-left:1px solid #dddddd; }

input::placeholder {
    opacity: 0.2;
    font-size: 13px;
}
input {
    font-size: 13px;
}
</style>

