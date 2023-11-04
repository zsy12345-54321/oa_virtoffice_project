import React, {useEffect, useRef, useState} from "react";
import InitializeVideoCall from "./InitializeVideoCall";
import ReceivedVideoCall from "./ReceivedVideoCall";
import { Connect, connect } from "react-redux";
import MyVideo from "./MyVideo";
import { MY_CHARACTER_INIT_CONFIG } from "./characterConstants";

function VideoCalls({myCharacterData, otherCharactersData, webrtcSocket}) {
    const [myStream, setMyStream] = useState();
    const [offersReceived, setOffersReceived] = useState({});
    useEffect(() => {
        console.log("ue");
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
            setMyStream(stream);
        });
    }, []);

    useEffect(() => {
        webrtcSocket.on('receiveOffer', payload => {
            console.log('Received offer from:', payload.callFromUserSocketId, 'Offer signal:', payload.offerSignal);
            if (!Object.keys(payload.offerSignal).includes(payload.callFromUserSocketId)) {
                setOffersReceived({
                    ...offersReceived,
                    [payload.callFromUserSocketId]: payload.offerSignal,
                });
            }
        });
    }, [webrtcSocket,offersReceived]);


    const myUserId = myCharacterData?.id;
    const initiateCallToUsers = Object.keys(otherCharactersData)
    .filter((othersUserId) => othersUserId >= myUserId)
    .reduce((filterObj, key) => {
        filterObj[key] = otherCharactersData[key];
        return filterObj;
    }, {});

    return <>{
        myCharacterData && <div className="videos">
            <MyVideo myStream={myStream} />
            {Object.keys(initiateCallToUsers).map((othersUserId) => {
                console.log("InitializeVideoCall", initiateCallToUsers[othersUserId]);
                return <InitializeVideoCall
                key = {initiateCallToUsers[othersUserId].socketId}
                mySocketId={myCharacterData.socketId}
                myStream={myStream}
                othersSocketId={initiateCallToUsers[othersUserId].socketId}
                webrtcSocket={webrtcSocket}/>
            })}
            {
                Object.keys(offersReceived).map((othersSocketId) => {
                    const matchingUserIds = Object.keys(otherCharactersData).filter((otherUserId) => otherCharactersData[otherUserId].socketId === othersSocketId);
                    console.assert(
                        matchingUserIds.length === 1,
                        "matchingUserIds.length !== 1",
                        matchingUserIds
                    )
                    return <ReceivedVideoCall
                    key = {othersSocketId}
                    mySocketId={myCharacterData.socketId}
                    myStream={myStream}
                    othersSocketId={othersSocketId}
                    webrtcSocket={webrtcSocket}
                    offerSignal={offersReceived[othersSocketId]}/>
                })
            }
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