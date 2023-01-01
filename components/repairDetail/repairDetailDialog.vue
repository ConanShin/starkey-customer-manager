<template>
    <v-dialog
        persistent fullscreen
        transition="dialog-bottom-transition"
        :value="dialog"
        max-width="800px">
        <v-card>
            <v-card-text class="pt-5">
                <v-row>
                    <v-col>
                        <v-text-field label="이름" v-model="repair.name" :disabled="readonly" clearable></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea label="주소" v-model="repair.address" rows="1"
                            auto-grow :disabled="readonly" no-resize clearable></v-textarea>
                <v-text-field label="등록일" v-model="repair.registrationDate" :disabled="readonly" placeholder="YYYY/MM/DD" clearable></v-text-field>
                <v-text-field label="전화번호 1" v-model="repair.phoneNumber" :disabled="readonly" placeholder="000-0000-0000" clearable>
                    <template v-slot:append v-if="readonly && repair.phoneNumber">
                        <v-icon @click="call(repair.phoneNumber)">mdi-phone</v-icon>
                    </template>
                </v-text-field>
                <v-text-field label="전화번호 2" v-model="repair.mobilePhoneNumber" :disabled="readonly" placeholder="000-0000-0000" clearable>
                    <template v-slot:append v-if="readonly && repair.mobilePhoneNumber">
                        <v-icon @click="call(repair.mobilePhoneNumber)">mdi-phone</v-icon>
                    </template>
                </v-text-field>
            </v-card-text>
            <v-data-table
                class="ma-2"
                :headers="headers"
                :items="repair.repairReport"
            >
                <template v-slot:top>
                    <v-card-subtitle>수리 내역</v-card-subtitle>
                </template>
                <template #item.date="{item}">
                    <v-text-field v-model="item.date" :disabled="readonly"></v-text-field>
                </template>
                <template #item.content="{item}">
                    <v-textarea label="수리내역" v-model="item.content" rows="1" auto-grow :disabled="readonly" no-resize hide-details clearable></v-textarea>
                </template>
                <template #item.delete="{item, index}">
                    <v-btn icon @click="deleteItem(index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="!readonly" @click="add">추가</v-btn>
                <v-btn v-if="readonly" @click="edit">수정</v-btn>
                <v-btn v-if="!readonly" @click="save">저장</v-btn>
                <v-btn v-if="!readonly && deleteVisible" @click="del">삭제</v-btn>
                <v-btn @click="close">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import UserInformation from "~/components/userDetail/userInformation.vue";
import UserHistory from "~/components/userDetail/userHistory.vue";
import {RepairReportInterface} from "~/interfaces/repair";
import {DataTableHeader} from "vuetify";
@Component({
    components: {UserHistory, UserInformation}
})
export default class RepairDetailDialog extends Vue {
    readonly: boolean = true
    deleteVisible: boolean = true

    headerList: Array<DataTableHeader> = [
        {text: '수리일', value: 'date'},
        {text: '수리내역', value: 'content'},
        {text: '삭제', value: 'delete'}
    ]

    get dialog() {
        return !!this.$store.getters.selectedRepair
    }

    get repair() {
        return JSON.parse(JSON.stringify(this.$store.getters.selectedRepair ?? {}))
    }

    edit() {
        this.readonly = false
    }

    async save() {
        if (!this.repair.name) return this.$store.dispatch('showToast', '이름을 입력해 주세요.')
        this.repair.repairReport = this.repair.repairReport?.filter((item: RepairReportInterface) => !!item.date)
        await this.$store.dispatch('updateRepair', this.repair)
        this.readonly = true
    }

    add() {
        if (this.repair.repairReport === undefined) this.repair.repairReport = []
        this.repair.repairReport.push({})
        this.$store.commit('selectedRepair', this.repair)
    }

    del() {
        this.$store.commit('dialog', {
            title: '고객삭제 확인',
            description: this.repair.name + '님의 수리기록을 삭제하시겠습니까?',
            callback: () => this.$store.dispatch('deleteRepair', this.repair)
        })
    }

    close() {
        this.readonly = true
        this.$store.commit('selectedRepair', null)
    }

    get headers() {
        if (this.readonly) return this.headerList.slice(0, 2)
        return this.headerList
    }

    deleteItem(index: number) {
        this.repair.repairReport.splice(index, 1)
        this.$store.commit('selectedRepair', this.repair)
    }

    call(number: string) {
        location.href = "tel:" + number
    }
}
</script>
<style>
*[disabled='disabled'] {
    color: black !important;
}
</style>
