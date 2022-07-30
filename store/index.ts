import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import {getDatabase, ref, onValue} from "firebase/database";
import UserCredential = firebase.auth.UserCredential;
import CredentialInterface from "~/interfaces/credential";
import UserInterface from "~/interfaces/user";
import firebase from '~/plugins/firebase'

Vue.use(Vuex)

class RootState {
    toast: string = ''
}

export default () => new Vuex.Store({
    mutations: {
        toast: (state: RootState, payload: string) => {
            Vue.set(state, 'toast', payload)
            setTimeout(() => Vue.set(state, 'toast', ''), 2000)
        }
    },
    actions: {
        login: async (actionContext: ActionContext<RootState, RootState>, payload: CredentialInterface): Promise<UserCredential> => {
            const auth = firebase.auth();
            return auth.signInWithEmailAndPassword(payload.email, payload.password);
        },
        getUserList: async (actionContext: ActionContext<RootState, RootState>) => {
            const db = getDatabase()
            const userListReference = ref(db, 'customers/')
            return new Promise(resolve => {
                onValue(userListReference, snapshot => {
                    const list = snapshot.val()
                    resolve(Object.keys(list).map((key: string) => {
                        return {
                            id: key,
                            ...list[key]
                        } as UserInterface
                    }))
                })
            })
        }
    },
    getters: {
        toast: (state: RootState) => state.toast
    }
})
