import { useEffect, useState } from "react";
import { FirebaseObject, createDocument } from "../../../firebase/firebase-operations";

export interface ChatUser {
    username: string;
    name: string;
}

export interface ChatUserRequest extends ChatUser, FirebaseObject {
}


export const useChatUserCreate = (user: ChatUser) => {

    const [isAddedUser, setIsAddedUser] = useState(false)

    useEffect(() => {

        // Function to add a user to the database
        const addUser = async () => {
            try {
                // Create a document in the "users" collection with user data
                await createDocument<ChatUserRequest>("users", [
                    {
                        title: user.username,
                        name: user.name,
                        username: user.username
                    }
                ]);
                // If successful, set isAddedUser to true
                setIsAddedUser(true);
            } catch (error) {
                // Log and handle any errors
                console.log(error);
                setIsAddedUser(false); // Set isAddedUser to false on error
            }
        };

        addUser()
		
	}, [])

    return {
        isAddedUser,
        username: user.username,
        name: user.name
    }

}