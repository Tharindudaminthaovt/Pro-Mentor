import { useEffect, useRef, useState } from "react"
import { FirebaseItemListenObject, retriveMessages } from "../../../firebase/firebase-operations"

export interface ChatMessageRetriveResponse extends FirebaseItemListenObject{
    from: string;
    to: string;
    message: string;
}

export const useRetriveMessages = (currentUserName: string) => {

    const lastTimestampRef = useRef<Date | null>(null); // Ref to track last received timestamp
    const [latestReservedMessage, setLatestReservedMessage] = useState<ChatMessageRetriveResponse>()

    const setRetriveMessage = (retrivedMessages: ChatMessageRetriveResponse) => {
        console.log(retrivedMessages)

        if (retrivedMessages.from !== currentUserName && retrivedMessages.to === currentUserName) {
            setLatestReservedMessage(retrivedMessages)
        }
    }

    useEffect(() => {

        const unsubscribe = retriveMessages<ChatMessageRetriveResponse>("messages", setRetriveMessage, lastTimestampRef)

        return () => unsubscribe()

    }, [])

    return {
        latestMessage: latestReservedMessage
    }

}