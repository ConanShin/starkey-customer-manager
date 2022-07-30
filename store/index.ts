import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import UserCredential = firebase.auth.UserCredential;
import CredentialInterface from "~/interfaces/credential";

Vue.use(Vuex)

const config = {
    apiKey: "AIzaSyAAjby47cHjqBOCPy4PzThrfbeSmUnk9eU",
    authDomain: "starkey.firebaseapp.com",
    databaseURL: "https://starkey.firebaseio.com/customers"
}
initializeApp(config)

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
        }
    },
    getters: {
        toast: (state: RootState) => state.toast
    }
})
