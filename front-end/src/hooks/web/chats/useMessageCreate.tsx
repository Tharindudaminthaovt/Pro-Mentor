import { useEffect, useState } from "react";
import { FirebaseObject, createDocument } from "../../../firebase/firebase-operations";
import uniqid from 'uniqid';

export interface ChatMessage {
    from: string;
    to: string;
    message: string;
}

export interface ChatMessageRequest extends ChatMessage, FirebaseObject {

}

export const useMessageCreate = () => {

    const [message, setMessage] = useState<ChatMessage>()
    const [isSendSuccess, setIsSendSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {

        const addMessage = async () => {
            setIsPending(true)
            setIsSendSuccess(false)
            if (message) {
                try {
                    await createDocument<ChatMessageRequest>("messages", [
                        {
                            to: message.to,
                            from: message.from,
                            message: message.message,
                            title: `${message.to}_${message.from}_${uniqid()}`
                        }
                    ])
                    setMessage(undefined)
                    setIsPending(false)
                    setIsSendSuccess(true)
        
                } catch (error) {
                    console.log(error)
                    setIsPending(false)
                    setIsSendSuccess(false)
                }
    
            }
        }

        addMessage()

    }, [message])

    return {
        setMessage,
        isSendSuccess,
        isPending
    }

}