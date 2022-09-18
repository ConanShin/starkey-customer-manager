<template>
    <v-dialog
        persistent fullscreen
        transition="dialog-bottom-transition"
        :value="dialog"
        max-width="800px">
        <v-card>
            <v-tabs
                v-model="tab"
                align-with-title
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab
                    v-for="item in tabList"
                    :key="item"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in tabList"
                    style="height: 100%"
                    :key="item"
                >
                    <user-information v-if="tab === 0" :readonly="readonly" :user="user"></user-information>
                    <user-history v-if="tab === 1" :readonly="readonly" :user="user"></user-history>
                </v-tab-item>
            </v-tabs-items>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="!readonly && tab === 1" @click="add">추가</v-btn>
                <v-btn v-if="readonly" @click="edit">수정</v-btn>
                <v-btn v-if="!readonly" @click="save">저장</v-btn>
                <v-btn @click="close">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'
import UserInformation from "~/components/userDetail/userInformation.vue";
import UserHistory from "~/components/userDetail/userHistory.vue";
import HearingAidInterface from "~/interfaces/hearingAid";
@Component({
    components: {UserHistory, UserInformation}
})
export default class UserDetailDialog extends Vue {
    tabList = ['개인정보', '구매 이력']
    tab = 0
    readonly: boolean = true

    get dialog() {
        if (this.$store.getters.selectedUser === null) this.tab = 0
        return !!this.$store.getters.selectedUser
    }

    get user() {
        return JSON.parse(JSON.stringify(this.$store.getters.selectedUser ?? {}))
    }

    edit() {
        this.readonly = false
    }

    async save() {
        this.user.hearingAid = this.user.hearingAid.filter((item: HearingAidInterface) => !!item.date)
        await this.$store.dispatch('updateUser', this.user)
        this.readonly = true
    }

    add() {
        this.user.hearingAid.push({})
        this.$store.commit('selectedUser', this.user)
    }

    close() {
        this.readonly = true
        this.$store.commit('selectedUser', null)
    }
}
</script>
<style>
*[disabled='disabled'] {
    color: black !important;
}
</style>
