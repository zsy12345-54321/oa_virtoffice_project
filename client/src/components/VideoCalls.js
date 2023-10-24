import React,{ useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import InitializeVideoCall from "./InitializeVideoCall";
import { MY_CHARACTER_INIT_CONFIG } from "./characterConstants";

function VideoCalls({ myCharacterData, otherCharacterData , webrtcSocket}) {
    const [myStream, setMyStream] = useState();
    console.log("VideoCallsA", myCharacterData, otherCharacterData);
    useEffect(() => {
        console.log("VideoCallsB", myCharacterData, otherCharacterData);
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
            setMyStream(stream);
            
        })
    },[]);
    console.log("VideoCallsC", myCharacterData, otherCharacterData);

    const myUserId = myCharacterData?.id;
    const initializeVideoCall = Object.keys(otherCharacterData)
        .filter((otherUserId) => otherUserId >= myUserId)
        .reduce((filteredObj, key) => {
            filteredObj[key] = otherCharacterData[key];
            return filteredObj;
        }, {});
    console.log("VideoCallsD", myCharacterData, otherCharacterData, initializeVideoCall);
    return <>{
        myCharacterData && <div className="videos">
            {Object.keys(initializeVideoCall).map((otherUserId) => {
                console.log("VideoCalls", initializeVideoCall[otherUserId]);
                return <InitializeVideoCall
                    key={initializeVideoCall[otherUserId].socketId}
                    myUserId={myUserId}
                    otherUserId={otherUserId}
                    myStream={myStream}
                    otherStream={initializeVideoCall[otherUserId].stream}
                    webrtcSocket={webrtcSocket} />
            })}
            </div>
    }</>;
}
  
const mapStateToProps = (state) => {
    const myCharacterData = state.allCharacters[MY_CHARACTER_INIT_CONFIG.id];
    const otherCharacterData = Object.keys(state.allCharacters)
    .filter(id => id !== MY_CHARACTER_INIT_CONFIG.id)
    .reduce((filteredObj, key) => {
        filteredObj[key] = state.allCharacters.users[key];
        return filteredObj;
    }, {});
    return {
        myCharacterData: myCharacterData,
        otherCharacterData :otherCharacterData,
    };
}

export default connect(mapStateToProps)(VideoCalls);
