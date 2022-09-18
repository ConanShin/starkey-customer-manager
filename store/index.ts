import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import {getDatabase, ref, onValue, set} from "firebase/database";
import UserCredential = firebase.auth.UserCredential;
import CredentialInterface from "~/interfaces/credential";
import UserInterface from "~/interfaces/user";
import firebase from '~/plugins/firebase'
import RepairInterface from "~/interfaces/repair";

Vue.use(Vuex)

interface RootState {
    toast: string
    userList: Array<UserInterface>
    repairList: Array<RepairInterface>
    selectedUser: UserInterface | null
    selectedRepair: RepairInterface | null
    loading: boolean
}

export const state = () => ({
    toast: '',
    userList: [],
    repairList: [],
    selectedUser: null,
    selectedRepair: null,
    loading: false,
})

export const mutations = {
    toast: (state: RootState, payload: string) => {
        Vue.set(state, 'toast', payload)
        setTimeout(() => Vue.set(state, 'toast', ''), 2000)
    },
    userList: (state: RootState, payload: Array<UserInterface>) => {
        Vue.set(state, 'userList', payload)
    },
    repairList: (state: RootState, payload: Array<RepairInterface>) => {
        Vue.set(state, 'repairList', payload)
    },
    selectedUser: (state: RootState, payload: UserInterface) => {
        Vue.set(state, 'selectedUser', payload)
    },
    selectedRepair: (state: RootState, payload: RepairInterface) => {
        Vue.set(state, 'selectedRepair', payload)
    },
    loading: (state: any, payload: boolean) => state.loading = payload,
}

export const actions = {
    login: async (actionContext: ActionContext<RootState, RootState>, payload: CredentialInterface): Promise<UserCredential> => {
        const auth = firebase.auth();
        return auth.signInWithEmailAndPassword(payload.email, payload.password);
    },
    getUserList: (actionContext: ActionContext<RootState, RootState>) => {
        const db = getDatabase()
        const userListReference = ref(db, 'customers/')
        onValue(userListReference, snapshot => {
            const list = snapshot.val()
            actionContext.commit('userList', Object.keys(list).map((key: string) => {
                return {
                    id: key,
                    ...list[key]
                } as UserInterface
            }))
        })
    },
    updateUser: async (actionContext: ActionContext<RootState, RootState>, payload: UserInterface) => {
        const db = getDatabase()
        const userReference = ref(db, 'customers/' + payload.id)
        const payloadWithoutId = JSON.parse(JSON.stringify(payload))
        delete payloadWithoutId.id
        actionContext.commit('selectedUser', payload)
        return set(userReference, payloadWithoutId)
    },

    getRepairList: (actionContext: ActionContext<RootState, RootState>) => {
        const db = getDatabase()
        const repairListReference = ref(db, 'repairs/')
        onValue(repairListReference, snapshot => {
            const list = snapshot.val()
            actionContext.commit('repairList', Object.keys(list).map((key: string) => {
                return {
                    id: key,
                    ...list[key]
                } as RepairInterface
            }))
        })
    },
    updateRepair: async (actionContext: ActionContext<RootState, RootState>, payload: RepairInterface) => {
        const db = getDatabase()
        const repairReference = ref(db, 'repairs/' + payload.id)
        const payloadWithoutId = JSON.parse(JSON.stringify(payload))
        delete payloadWithoutId.id
        actionContext.commit('selectedRepair', payload)
        return set(repairReference, payloadWithoutId)
    },
}

export const getters = {
    toast: (state: RootState) => state.toast,
    userList: (state: RootState) => state.userList,
    repairList: (state: RootState) => state.repairList,
    selectedUser: (state: RootState) => state.selectedUser,
    selectedRepair: (state: RootState) => state.selectedRepair,
    loading: (state: RootState) => state.loading,
}
