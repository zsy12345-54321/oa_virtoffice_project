import React, {useEffect, useRef, useState} from "react";
import InitializeVideoCall from "./InitializeVideoCall";
import { Connect, connect } from "react-redux";
import { MY_CHARACTER_INIT_CONFIG } from "./characterConstants";

function VideoCalls({myCharacterData, otherCharactersData, webrtcSocket}) {
    const [myStream, setMyStream] = useState();
    useEffect(() => {
        console.log("ue");
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
            setMyStream(stream);
        });
    }, []);

    useEffect(() => {
        const handleReceiveOffer = ({callFromUserSocketId, offerSignal}) => {
            console.log('Received offer from:', callFromUserSocketId, 'Offer signal:', offerSignal);
        };
        webrtcSocket?.on('receiveOffer', handleReceiveOffer);
        return () => {
            webrtcSocket?.off('receiveOffer', handleReceiveOffer);
        };
    }, [webrtcSocket]);
    

    const myUserId = myCharacterData?.id;
    const initiateCallToUsers = Object.keys(otherCharactersData)
    .filter((othersUserId) => othersUserId !== myUserId)
    .reduce((filterObj, key) => {
        filterObj[key] = otherCharactersData[key];
        return filterObj;
    }, {});

    return <>{
        myCharacterData && <div className="videos">
            {Object.keys(initiateCallToUsers).map((othersUserId) => {
                return <InitializeVideoCall
                key = {initiateCallToUsers[othersUserId].socketId}
                mySocketId={myCharacterData.socketId}
                myStream={myStream}
                othersSocketedId={initiateCallToUsers[othersUserId].socketId}
                webrtcSocket={webrtcSocket}/>
            })}
        </div>
    }</>
}

const mapStateToProps = (state) => {
    const myCharacterData = state.allCharacters.users[MY_CHARACTER_INIT_CONFIG.id];
    const otherCharactersData = Object.keys(state.allCharacters.users)
        .filter((id) => id !== MY_CHARACTER_INIT_CONFIG.id)
        .reduce((filterObj, key) => {
            filterObj[key] = state.allCharacters.users[key];
            return filterObj;
        }, {});
    return {myCharacterData: myCharacterData, otherCharactersData: otherCharactersData};
};

export default connect(mapStateToProps, {})(VideoCalls);