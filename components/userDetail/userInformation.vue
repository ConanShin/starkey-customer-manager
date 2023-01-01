<template>
    <div style="height: 100%; overflow: auto">
        <v-card-text>
            <v-row>
                <v-col>
                    <v-text-field label="이름" v-model="user.name" :disabled="readonly" clearable></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="성별" v-model="user.sex" :disabled="readonly" clearable></v-text-field>
                </v-col>
            </v-row>
            <v-textarea label="주소" v-model="user.address" rows="1"
                        auto-grow :disabled="readonly" no-resize clearable></v-textarea>
            <v-row>
                <v-col>
                    <v-text-field label="생년월일" v-model="user.age" :disabled="readonly" placeholder="YYYY/MM/DD" clearable></v-text-field>
                </v-col>
                <v-col>
                    <v-checkbox label="복지카드" v-model="user.cardAvailability" :disabled="readonly" clearable></v-checkbox>
                </v-col>
            </v-row>
            <v-text-field label="배터리 구입일" v-model="user.batteryOrderDate" :disabled="readonly" placeholder="YYYY/MM/DD" clearable></v-text-field>
            <v-text-field label="등록일" v-model="user.registrationDate" :disabled="readonly" placeholder="YYYY/MM/DD" clearable></v-text-field>
            <v-text-field label="전화번호 1" v-model="user.phoneNumber" :disabled="readonly" placeholder="000-0000-0000" clearable>
                <template v-slot:append v-if="readonly && user.phoneNumber">
                    <v-icon @click="call(user.phoneNumber)">mdi-phone</v-icon>
                </template>
            </v-text-field>
            <v-text-field label="전화번호 2" v-model="user.mobilePhoneNumber" :disabled="readonly" placeholder="000-0000-0000" clearable>
                <template v-slot:append v-if="readonly && user.mobilePhoneNumber">
                    <v-icon @click="call(user.mobilePhoneNumber)">mdi-phone</v-icon>
                </template>
            </v-text-field>
            <v-textarea label="노트" v-model="user.note" rows="1" auto-grow :disabled="readonly" no-resize hide-details clearable></v-textarea>
        </v-card-text>
    </div>
</template>

<script lang=ts>
import {Vue, Component, Prop} from 'vue-property-decorator'
import UserInterface from "~/interfaces/user";

@Component
export default class UserInformation extends Vue {
    @Prop() readonly!: boolean
    @Prop() user!: UserInterface
    call(number: string) {
        location.href = "tel:" + number
    }
}
</script>

<style scoped lang="scss">

</style>
