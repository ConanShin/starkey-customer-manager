<template>
    <v-row justify="center">
        <v-dialog
            v-model="!!this.dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">{{this.dialog?.title}}</v-card-title>
                <v-card-text>{{this.dialog?.description}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="confirm"
                    >확인</v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="reset"
                    >취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import DialogInterface from "~/interfaces/dialog";

@Component
export default class Popup extends Vue {
    get dialog(): DialogInterface {
        return this.$store.getters.dialog
    }
    confirm() {
        this.dialog.callback()
        this.reset()
    }
    reset() {
        this.$store.commit('dialog', null)
    }
}
</script>

<style scoped>

</style>
