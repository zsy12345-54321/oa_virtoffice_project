import React,{ useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import InitializeVideoCall from "./InitializeVideoCall";
import { MY_CHARACTER_INIT_CONFIG } from "./characterConstants";

function VideoCalls({ myCharacterData, otherCharacterData , webrtcSocket}) {
    const [myStream, setMyStream] = useState();
    useEffect(() => {
        console.log("VideoCalls", myCharacterData, otherCharacterData);
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
            setMyStream(stream);
            initializeVideoCall(stream, myCharacterData, otherCharacterData, webrtcSocket);
        })
    },[]);

    const myUserId = myCharacterData?.id;
    const initializeVideoCall = Object.keys(otherCharacterData)
        .filter((otherUserId) => otherUserId >= myUserId)
        .reduce((filteredObj, key) => {
            filteredObj[key] = otherCharacterData[key];
            return filteredObj;
        }, {});
    return <>{
        myCharacterData && <div className="videos">
            {Object.keys(initializeVideoCall).map((otherUserId) => {
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
        filteredObj[key] = state.allCharacters[key];
        return filteredObj;
    }, {});
    return {
        myCharacterData,
        otherCharacterData,
    };
}

export default connect(mapStateToProps)(VideoCalls);
