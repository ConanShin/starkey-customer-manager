<template>
    <v-card style="padding: 0 0 20px 0; margin: 5px">
        <v-card-title>{{ title }}</v-card-title>
        <v-row v-masonry style="margin-left: 1px">
            <v-card
                :key="item.id"
                v-for="item in list"
                width="45vw"
                max-width="400px"
                class="ma-1"
                @click="showDetail(item)"
                v-masonry-tile>
                <v-card-text>
                    <h3>{{item.name}}</h3>
                    <div>{{item.address}}</div>
                    <u v-if="item.phoneNumber?.length > 8" @click.stop.prevent="call(item.phoneNumber)">{{item.phoneNumber}}</u>
                    <u v-if="item.mobilePhoneNumber?.length > 8" @click.stop.prevent="call(item.mobilePhoneNumber)">{{item.mobilePhoneNumber}}</u>
                </v-card-text>
            </v-card>
        </v-row>
    </v-card>
</template>

<script lang=ts>
import {Vue, Component, Prop} from 'vue-property-decorator'
import UserInterface from "~/interfaces/user";
import HearingAidInterface from "~/interfaces/hearingAid";

@Component
export default class NoticeTable extends Vue {
    @Prop() title!: string
    @Prop() startDate!: Date
    @Prop() yearBased!: boolean
    get list(): Array<UserInterface> {
        this.startDate.setHours(0, 0, 0, 0)
        return this.$store.getters.userList.filter((item: UserInterface) => {
            return item.hearingAid?.some((aid: HearingAidInterface) => {
                const purchasedDate = new Date(aid.date)
                const boundaryDate = new Date(this.startDate)
                boundaryDate.setDate(this.startDate.getDate() + 3)
                if (this.yearBased) {
                    return purchasedDate.getFullYear() === this.startDate.getFullYear() && purchasedDate.getMonth() === this.startDate.getMonth()
                } else {
                    return purchasedDate >= this.startDate && purchasedDate <= boundaryDate
                }
            })
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
