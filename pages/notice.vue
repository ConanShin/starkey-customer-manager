<template>
    <div>
        <notice-table
            title="1주차 고객"
            :startDate="new Date(new Date().setDate(new Date().getDate() - 7))"
            :yearBased="false"
        ></notice-table>
        <notice-table
            title="3주차 고객"
            :startDate="new Date(new Date().setDate(new Date().getDate() - 21))"
            :yearBased="false"
        ></notice-table>
        <notice-table
            title="7주차 고객"
            :startDate="new Date(new Date().setDate(new Date().getDate() - 49))"
            :yearBased="false"
        ></notice-table>
        <notice-table
            title="1년차 고객"
            :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 1))"
            :yearBased="true"
        ></notice-table>
        <notice-table
            title="2년차 고객"
            :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 2))"
            :yearBased="true"
        ></notice-table>
        <notice-table
            title="5년차 고객"
            :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 5))"
            :yearBased="true"
        ></notice-table>
    </div>
</template>
<script lang=ts>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Notice extends Vue {
}
</script>

