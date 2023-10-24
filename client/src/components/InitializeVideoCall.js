import React, { useCallback, useEffect, useRef, useState } from "react";
import Peer from 'simple-peer';

function InitializeVideoCall({mySocketId, myStream, othersSocketedId, webrtcSocket}) {
    const peerRef = useRef();
    console.log("initializeVideoCall", InitializeVideoCall);

    const creatPeer = useCallback((othersSocketedId, mySocketId, myStream,webrtcSocket) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: myStream,
        });
        peer.on('signal', (signal) => {
            console.log("creatPeer", signal);
            webrtcSocket.emit('sendOffer', { callToUserSocketId: othersSocketedId, callFromUserSocketId: mySocketId, offerSignal: signal })
        });
        return peer;
    },[]);

    useEffect(() => {
        peerRef.current = creatPeer(othersSocketedId, mySocketId, myStream,webrtcSocket);
    }, [mySocketId, myStream, othersSocketedId, webrtcSocket]);
    return <></>;
}

export default InitializeVideoCall;