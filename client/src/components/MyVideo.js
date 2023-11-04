import React, { useCallback} from 'react';

function MyVideo({myStream}) {
  const setVideoNode = useCallback(videoNode => {
    videoNode && (videoNode.srcObject = myStream);
}, [myStream]);
  return<> 
    {myStream && <video width= "320px" height="240px" autoPlay= "true" ref={setVideoNode} />}
  </>
}

export default MyVideo;
