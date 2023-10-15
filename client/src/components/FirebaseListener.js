import React, {useEffect} from "react";
import {ref, onValue,} from "firebase/database";
import { firebaseDatabase } from "../firebase/firebase";
import { connect } from "react-redux";
import  {update as updateAllCharactersData} from "./slices/allCharactersSlice";

const FirebaseListener = ({updateAllCharactersData}) => {
    useEffect(() => {
        const posRef = ref(firebaseDatabase, 'users/'); 
        const unscribeUsersListener = onValue(posRef, (snapshot) => {
            const data = snapshot.val();
            console.log("FirebaseListener data", data);
            updateAllCharactersData(data);
            });
        return unscribeUsersListener;
    }, []);
    return <></>;
    }

export default connect(null, {updateAllCharactersData})(FirebaseListener);
