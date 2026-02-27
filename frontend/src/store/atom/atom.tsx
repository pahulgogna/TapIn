import axios from "axios"
import { atom, selector } from "recoil"


type UserSchema = {
    id: number
    email: string
    name: string
}

export type NoteSchema = {
    id: string
    title: string
    content: string
    userId: string
}


export const userAtom = atom({
    key: "userAtom",
    default: selector ({
        key: "userSelector",
        get: async () => {

            try{
                const res = await axios.get(`${import.meta.env.VITE_BEEP}/user/me`, {
                    withCredentials: true
                })
                let data: UserSchema = res.data
                
                return data
            }
            catch(e){
                console.log(e)
                return null
            }
        }

    })
})


export const notesAtom = atom({
    key: "notesAtom",
    default: selector({
        key: "notesSelector",
        get: async () => {
            try{
                const res: NoteSchema[] = (await axios.get(`${import.meta.env.VITE_BEEP}/notes/all`, {
                    withCredentials: true
                })).data

                return res
            }
            catch(e){
                console.log(e)
                return null
            }
        }
    })
})
