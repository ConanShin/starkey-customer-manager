<template>
    <v-dialog persistent :value="dialog">
        <v-card class="pa-2">
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-text-field label="이름" v-model="user.name" readonly></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="성별" v-model="user.sex" readonly></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea label="주소" v-model="user.address" rows="1"
                            auto-grow readonly no-resize></v-textarea>
                <v-row>
                    <v-col>
                        <v-text-field label="나이" v-model="user.age" readonly></v-text-field>
                    </v-col>
                    <v-col>
                        <v-checkbox label="복지카드" v-model="user.cardAvailability" readonly></v-checkbox>
                    </v-col>
                </v-row>
                <v-text-field label="배터리 구입일" v-model="user.batteryOrderDate" readonly></v-text-field>
                <v-text-field label="등록일" v-model="user.registrationDate" readonly></v-text-field>
                <v-text-field label="전화번호 1" v-model="user.phoneNumber" readonly></v-text-field>
                <v-text-field label="전화번호 2" v-model="user.mobilePhoneNumber" readonly></v-text-field>
                <v-textarea label="노트" v-model="user.note" rows="1" auto-grow readonly no-resize hide-details></v-textarea>
<!--                <div>{{user.hearingAid}}</div>-->
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class UserDetailDialog extends Vue {
    get dialog() {
        return !!this.$store.getters.selectedUser
    }

    get user() {
        return this.$store.getters.selectedUser ?? {}
    }

    close() {
        this.$store.commit('selectedUser', null)
    }
}
</script>
