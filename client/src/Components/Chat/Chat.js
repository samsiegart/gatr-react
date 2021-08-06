import './Chat.css';
import Ringer from '../Ringer/Ringer';
import VideoContainer from '../VideoContainer/VideoContainer';
import openSocket from 'socket.io-client';
import { useState, useEffect } from 'react';

const { RTCPeerConnection, RTCSessionDescription } = window;
const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };

function Chat({onFailedToGetUserMedia}) {
  const [socket, setSocket] = useState(null);
  const [userMediaStream, setUserMediaStream] = useState(null);
  const [peerMediaStream, setPeerMediaStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const socket = openSocket(window.location.href);

    getUserMedia()
      .then((stream) => {
        setUserMediaStream(stream);
        setPeerConnection(
          setupPeerConnection(stream, (peer) => setPeerMediaStream(peer)));
      })
      .catch((e) => onFailedToGetUserMedia());

    setSocket(socket);
  }, []);

  useEffect(() => {
    if (peerConnection == null) return;
    socket.on('answer-made', data => {
      setRemoteDescription(data);
    });
  }, [peerConnection]);

  function setRemoteDescription(data) {
    peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  }

  async function createOffer(callee) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    onIceGatheringComplete(peerConnection, () => {
      socket.emit('call-user', {
        offer: peerConnection.localDescription,
        to: callee
      });
    })
  }

  async function createAnswer(offer) {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer.offer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    onIceGatheringComplete(peerConnection, () => {
      socket.emit('make-answer', {
        answer: peerConnection.localDescription,
        to: offer.name
      });
    });
  }

  return (
    <div className={`content-container ${peerMediaStream !== null ? 'active-call' : ''}`}>
        <VideoContainer socket={socket}
                        userMediaStream={userMediaStream}
                        peerMediaStream={peerMediaStream} />
        <Ringer socket={socket}
          ready={userMediaStream !== null}
          call={(to) => createOffer(to)}
          acceptCall={(offer) => createAnswer(offer)}
          isHidden={peerMediaStream !== null} />
    </div>
  );
}

function onIceGatheringComplete(peerConnection, callback) {
  if (peerConnection.iceGatheringState === 'complete') {
    callback();
    return;
  }

  peerConnection.addEventListener('icecandidate', event => {
    console.log('ice gathering in progress');
    if (!event.candidate) {
      console.log('ice gathering complete');
      callback();
    }
  });
}

async function getUserMedia() {
  try {
    const userMediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    return userMediaStream;
  } catch (error) {
    console.warn(error.message);
    alert('You need to grant permissions to use this app. Try again then refresh.');
    throw (error);
  }
}

function setupPeerConnection(userMediaStream, onTrack) {
  const peerConnection = new RTCPeerConnection(configuration);
  peerConnection.ontrack = function ({ streams: [stream] }) {
    console.log('got remote stream');
    onTrack(stream);
  };
  userMediaStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, userMediaStream);
  });
  return peerConnection;
}

export default Chat;
