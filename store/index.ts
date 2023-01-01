import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import {getDatabase, ref, onValue, set, remove} from "firebase/database";
import UserCredential = firebase.auth.UserCredential;
import CredentialInterface from "~/interfaces/credential";
import UserInterface from "~/interfaces/user";
import firebase from '~/plugins/firebase'
import RepairInterface from "~/interfaces/repair";
import DialogInterface from "~/interfaces/dialog";
import CheckInterface from "~/interfaces/check";

Vue.use(Vuex)

interface RootState {
    toast: string
    userList: Array<UserInterface>
    repairList: Array<RepairInterface>
    checkList: Array<CheckInterface>
    selectedUser: UserInterface | null
    selectedRepair: RepairInterface | null
    loading: boolean,
    dialog: DialogInterface | null
}

export const state = () => ({
    toast: '',
    userList: [],
    repairList: [],
    checkList: [],
    selectedUser: null,
    selectedRepair: null,
    loading: false,
    dialog: null
})

export const mutations = {
    toast: (state: RootState, payload: string) => {
        Vue.set(state, 'toast', payload)
    },
    userList: (state: RootState, payload: Array<UserInterface>) => {
        Vue.set(state, 'userList', payload)
    },
    repairList: (state: RootState, payload: Array<RepairInterface>) => {
        Vue.set(state, 'repairList', payload)
    },
    checkList: (state: RootState, payload: Array<CheckInterface>) => {
        Vue.set(state, 'checkList', payload)
    },
    selectedUser: (state: RootState, payload: UserInterface) => {
        Vue.set(state, 'selectedUser', payload)
    },
    selectedRepair: (state: RootState, payload: RepairInterface) => {
        Vue.set(state, 'selectedRepair', payload)
    },
    loading: (state: RootState, payload: boolean) => state.loading = payload,
    dialog: (state: RootState, payload: DialogInterface | null) => state.dialog = payload
}

export const actions = {
    showToast: async (actionContext: ActionContext<RootState, RootState>, payload: string) => {
        actionContext.commit('toast', payload)
        setTimeout(() => actionContext.commit('toast', ''), 2000)
    },
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
    deleteUser: async (actionContext: ActionContext<RootState, RootState>, payload: UserInterface) => {
        const db = getDatabase()
        if (!!payload.id) {
            await remove(ref(db, 'customers/' + payload.id))
            actionContext.commit('selectedUser', null)
        }
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
    deleteRepair: async (actionContext: ActionContext<RootState, RootState>, payload: RepairInterface) => {
        const db = getDatabase()
        if (!!payload.id) {
            await remove(ref(db, 'repairs/' + payload.id))
            actionContext.commit('selectedRepair', null)
        }
    },
    getCheckList: async (actionContext: ActionContext<RootState, RootState>, payload: RepairInterface) => {
        const db = getDatabase()
        const checkReference = ref(db, 'check/')
        return new Promise((resolve) => {
            onValue(checkReference, snapshot => {
                const list = snapshot.val()
                if (!list) return resolve([])
                const formattedList = Object.keys(list).map((key: string) => {
                    return {
                        id: key,
                        ...list[key]
                    } as CheckInterface
                })
                actionContext.commit('checkList', formattedList)
                resolve(formattedList)
            })
        })
    },
    updateCheck: async (actionContext: ActionContext<RootState, RootState>, payload: Array<RepairInterface>) => {
        const db = getDatabase()
        const repairReference = ref(db, 'check/')
        await set(repairReference, payload)
        actionContext.commit('checkList', payload)
    },
}

export const getters = {
    toast: (state: RootState) => state.toast,
    userList: (state: RootState) => state.userList,
    repairList: (state: RootState) => state.repairList,
    checkList: (state: RootState) => state.checkList,
    selectedUser: (state: RootState) => state.selectedUser,
    selectedRepair: (state: RootState) => state.selectedRepair,
    loading: (state: RootState) => state.loading,
    dialog: (state: RootState) => state.dialog
}
