import React, { useCallback, useEffect, useRef, useState } from "react";
import Peer from 'simple-peer';

function InitializeVideoCall({mySocketId, myStream, othersSocketId, webrtcSocket}) {
    const peerRef = useRef();
    console.log("initializeVideoCall", InitializeVideoCall);

    const createPeer = useCallback((othersSocketId, mySocketId, myStream,webrtcSocket) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: myStream,
        });
        peer.on('signal', (signal) => {
            console.log("createPeer", signal);
            webrtcSocket.emit('sendOffer', { callToUserSocketId: othersSocketId, callFromUserSocketId: mySocketId, offerSignal: signal })
        });
        return peer;
    },[]);

    useEffect(() => {
        peerRef.current = createPeer(othersSocketId, mySocketId, myStream,webrtcSocket);
        webrtcSocket.on('receiveAnswer', (payload) => {
            console.log('Received answer from:', payload.callFromUserSocketId, 'Answer signal:', payload.answerSignal);
            if (payload.callToUserSocketId === othersSocketId) {
                peerRef.current.signal(payload.answerSignal);
            }
        });
    }, [mySocketId, myStream, othersSocketId, webrtcSocket]);
    return <></>;
}

export default InitializeVideoCall;