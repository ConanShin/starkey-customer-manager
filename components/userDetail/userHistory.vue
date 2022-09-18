<template>
    <div style="height: 100%; overflow: auto">
        <v-data-table
            :headers="headers"
            :items="user.hearingAid"
        >
            <template #item.date="{item}">
                <v-text-field v-model="item.date" :disabled="readonly"></v-text-field>
            </template>
            <template #item.model="{item}">
                <v-text-field v-model="item.model" :disabled="readonly"></v-text-field>
            </template>
            <template #item.side="{item}">
                <v-text-field v-model="item.side" :disabled="readonly"></v-text-field>
            </template>
            <template #item.delete="{item, index}">
                <v-btn icon @click="deleteItem(index)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script lang=ts>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {DataTableHeader} from "vuetify";
import UserInterface from "~/interfaces/user";

@Component
export default class UserHistory extends Vue {
    @Prop() readonly!: boolean
    @Prop() user!: UserInterface

    headerList: Array<DataTableHeader> = [
        {text: '구매일', value: 'date'},
        {text: '모델명', value: 'model'},
        {text: '방향', value: 'side'},
        {text: '삭제', value: 'delete'}
    ]

    get headers() {
        if (this.readonly) return this.headerList.slice(0, 3)
        return this.headerList
    }

    deleteItem(index: number) {
        this.user.hearingAid.splice(index, 1)
        this.$store.commit('selectedUser', this.user)
    }
}
</script>

<style scoped lang="scss">

</style>
