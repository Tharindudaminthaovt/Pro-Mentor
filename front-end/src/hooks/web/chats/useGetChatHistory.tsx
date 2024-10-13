import { useEffect, useState } from "react"
import { ChatMessageRetriveResponse } from "./useRetriveMessages"
import { getAllChatsWithFilter } from "../../../firebase/firebase-operations"

export interface MessageHistoryRequest {
    currentUserName: string;
    resipiant: string;
}

export const useGetChatHistory = () => {

    const [historyMessages, setHistoryMessages] = useState<ChatMessageRetriveResponse[]>([])
    const [chatHistoryUser, setChatHistoryUser] = useState<MessageHistoryRequest>();

    useEffect(() => {

        if (chatHistoryUser) {
            const getAllHistoryMessages = async () => {

                try {
    
                    const response = await getAllChatsWithFilter<ChatMessageRetriveResponse>("messages", [chatHistoryUser.currentUserName, chatHistoryUser.resipiant])
    
                    setHistoryMessages(response)
                } catch (error) {
                    console.log(error)
                    setHistoryMessages([])
                }
            }
    
            getAllHistoryMessages()
        }

    }, [chatHistoryUser])

    return {
        historyMessages,
        setChatHistoryUser
    }

}