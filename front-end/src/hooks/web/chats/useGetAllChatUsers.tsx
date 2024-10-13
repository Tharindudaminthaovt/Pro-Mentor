import { useEffect, useState } from "react"
import { getAllCollections } from "../../../firebase/firebase-operations"
import { ChatUser, ChatUserRequest } from "./useChatUserCreate"

export const useGetAllChatUsers = (currentUserName: string) => {

    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);

    useEffect(() => {

        const getAllUsers = async () => {
            try {
                const response = await getAllCollections<ChatUserRequest>("users")

                const users : ChatUser[] = response.filter(item => item.username !== currentUserName)
                            .map(item => ({username: item.username, name: item.name}))

                setChatUsers(users)

            } catch (error) {
                console.log(error)
                setChatUsers([]);
            }
        }

        getAllUsers()

    }, [])

    return {
        chatUsers
    }

}