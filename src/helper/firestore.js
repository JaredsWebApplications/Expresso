import {
    doc,
    setDoc,
    updateDoc,
    query,
    getDocs,
    getFirestore,
    collection,
    writeBatch,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { DataStore } from "./datastore.js";

class FirebaseStore extends DataStore {
    constructor(path) {
        super(path);
        // if (admin.apps.length === 0) {
        //   // Stupid freaking react issues
        //   // https://github.com/firebase/firebase-tools/issues/1532#issuecomment-812562512
        //   admin.initializeApp(config);
        // }
        const fireBaseApp = initializeApp({
            // this is probably bad practice in like 99% of use cases but
            // I don't care :)

            apiKey: "AIzaSyA7RlUev9QF-28_vVFdjPpJQVpDVeM1ANU",

            authDomain: "coffeerunbackend.firebaseapp.com",

            projectId: "coffeerunbackend",

            storageBucket: "coffeerunbackend.appspot.com",

            messagingSenderId: "808358809443",

            appId: "1:808358809443:web:65ee44e006515414a00d56",

            measurementId: "G-TFHDTLZNTL",
        });

        this.data_base = getFirestore();
    }

    async _add(payload, _collection, document_id) {
        /*
         * Template function for the firestore to add to a selected document
         */

        await setDoc(doc(this.data_base, _collection, document_id), payload);
    }
    async add(payload, _collection) {
        await this._add(payload, _collection, this.makeDocHash(20));
    }

    async add_session(payload, _collection, session) {
        /*
         * add new session id for the current user
         */
        await this._add(payload, _collection, session);
    }
    async update(payload, _collection, document_id) {
        /*
         * Update records
         */
        await updateDoc(doc(this.data_base, _collection, document_id), payload);
    }
    async getAll(_collection) {
        /*
         * Get all documents from a collection
         */

        const querySnapshot = await getDocs(
            collection(this.data_base, _collection)
        );
        var documents = [];
        querySnapshot.forEach((doc) => {
            documents.push([doc.id, doc.data()]);
        });
        return await documents;
    }

    async _get(_collection, document_id) {
        /*
         * Get information from a collection as a document object
         * So we can use this for removing and updating at will
         */

        var container = [];

        const current_query = await query(
            collection(this.data_base, _collection, document_id)
        );

        const value = await getDocs(current_query);
        value.forEach((doc) => {
            container.push(doc);
        });

        return await container;
    }

    async get(email) {
        // Javascript, my boy
        // If the function signature does not match the function call
        // DO
        // NOT
        // RUN
        // TELL
        // ME
        // WHY!!!!!

        return;
    }

    async filter(_collection, attr, desired) {
        /*
         * Apply a filter to the get function
         * I understand this is how the "where" function essentially works
         * but I am too crammed for time to attempt to get this to work
         */

        var container = [];
        const value = await this.getAll(_collection);

        value.forEach((doc) => {
            // I don't care, I really don't
            const [document_id, data] = doc;
            if (data.value === undefined && data[attr] === desired) {
                container.push(doc);
            }
            if (data.value !== undefined && data.value[attr] === desired) {
                container.push(doc);
            }
        });
        return await container;
    }

    async remove(_collection, document_id) {
        /*
         * Remove element from a collection
         * Example:
         * collection (location)
         * - document (document_id)
         */
        const batch = writeBatch(this.data_base);
        (await this._get(_collection, document_id)).forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }

    makeDocHash(len) {
        // Create a document hash for Firebase
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < len; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
}

const _FirebaseStore = FirebaseStore;
export { _FirebaseStore as FirebaseStore };
