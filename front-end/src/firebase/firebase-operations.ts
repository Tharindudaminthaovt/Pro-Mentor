import { collection, doc, writeBatch, query, startAfter, getDocs, orderBy, serverTimestamp, onSnapshot, where } from "firebase/firestore"
import { firestore } from "./firebase";
import { FieldValueTypeToDate } from "../utils/dateTImeHandler";

export interface FirebaseObject {
    title: string;
}

export interface FirebaseGetAllResponseObject {

}

export interface FirebaseItemListenObject {
    timestamp: Date
}

const createDocument = async <T extends FirebaseObject>(collectionKey: string, params: T[]) => {

    const collectionRef = collection(firestore, collectionKey)
    const batch = writeBatch(firestore)

    params.forEach(item => {
        const documentRef = doc(collectionRef, item.title)
        batch.set(documentRef, {
            ...item,
            timestamp: serverTimestamp()
        })
    })

    await batch.commit()
    
}

const getAllCollections = async <T extends FirebaseGetAllResponseObject>(collectionKey: string) : Promise<T[]> => {

    const collectionRef = collection(firestore, collectionKey)

    const q = query(collectionRef)

    const querySnapShot = await getDocs(q)

    return querySnapShot.docs.map(docSnapshot => docSnapshot.data() as T)
    
}

const retriveMessages = <T extends FirebaseItemListenObject>(collectionKey: string, setResult: (item: T) => void, lastTimestampRef:React.MutableRefObject<Date | null>) => {

    const collectionRef = collection(firestore, collectionKey)
    let queryRef;

    if (lastTimestampRef?.current) {
        queryRef = query(collectionRef, orderBy("timestamp"), startAfter(lastTimestampRef.current));
    } else {
        queryRef = query(collectionRef, orderBy("timestamp"))
    }

    return onSnapshot(queryRef, (snapshot) => {
        const retrivedMessages: T[] = [];

        snapshot.forEach((doc) => {
            retrivedMessages.push(doc.data() as T);
        });

        if (snapshot.docs.length > 0) {
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];

            if (lastTimestampRef?.current) {
                setResult({
                    ...lastDoc.data(),
                    timestamp: FieldValueTypeToDate(lastDoc.data().timestamp?.seconds, lastDoc.data().timestamp?.nanoseconds)
                } as T)
            }

            lastTimestampRef.current = lastDoc.data().timestamp; // Update last timestamp
        }
    })
}

const getAllChatsWithFilter = async <T extends FirebaseGetAllResponseObject>(
    collectionKey: string,
    valus: string[]
  ): Promise<T[]> => {

    const collectionRef = collection(firestore, collectionKey);

    const q = query(collectionRef,
      where("to", "in", valus), // Filter "to" property 
      where("from", "in", valus), // Filter "from" property
      orderBy("timestamp")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as T);
  };

export {
    createDocument,
    getAllCollections,
    retriveMessages,
    getAllChatsWithFilter
}