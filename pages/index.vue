<template>
    <v-row justify="center" align="center">
        <v-data-table
            :headers="headers"
            :items="list"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :search="search"
            :custom-filter="filter"
        >
            <template v-slot:top>
                <v-text-field
                    v-model="search"
                    label="Search (UPPER CASE ONLY)"
                    class="mx-4"
                ></v-text-field>
            </template>
            <template #item.address="{value}">{{value.length > 1 ? value : ''}}</template>
            <template #item.phoneNumber="{value}">
                <a v-if="value.length > 8" :href='"tel:" + value'>{{value}}</a>
            </template>
            <template #item.mobilePhoneNumber="{value}">
                <a v-if="value.length > 8" :href='"tel:" + value'>{{value}}</a>
            </template>
        </v-data-table>
    </v-row>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import {DataTableHeader} from "vuetify";
import UserInterface from "~/interfaces/user";

@Component
export default class Home extends Vue {
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

    async getUserList() {
        this.list = await this.$store.dispatch('getUserList')
    }

    filter(value: string, search: string, item: UserInterface) {
        return value != null &&
            search != null &&
            value.toString().indexOf(search) !== -1
    }

    beforeMount() {
        this.getUserList()
    }
}
</script>
