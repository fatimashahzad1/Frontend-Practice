import { Button } from '@/components/ui/button';
import { useSocketContext } from '@/contexts/socket-context';
import { Mic, MicOff, PhoneCall, Video, VideoOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const SingleVideoCall: React.FC = () => {
  const {
    remoteUser,
    setRemoteUser,
    leaveCall,
    agoraClient,
    localUserName,
    remoteUsername,
    socket,
  } = useSocketContext();
  // State for mute/unmute and camera on/off
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agoraClient?.localTracks[0] && localVideoRef.current) {
      agoraClient?.localTracks[0].play(localVideoRef.current);
    }
  }, [agoraClient, agoraClient?.localTracks[0]]);

  useEffect(() => {
    if (remoteUser?.videoTrack && remoteVideoRef.current) {
      remoteUser.videoTrack.play(remoteVideoRef.current);
    }
  }, [remoteUser]);

  useEffect(() => {
    agoraClient?.on('user-published', async (user, mediaType) => {
      if (mediaType === 'video') {
        await agoraClient.subscribe(user, mediaType);
        setRemoteUser(user);
      }
    });

    agoraClient?.on('user-unpublished', async (user, mediaType) => {
      if (mediaType === 'video') {
        setRemoteUser(null);
      }
    });

    agoraClient?.on('user-left', (user, reason) => {
      socket?.emit('leaveCall', { channelName: agoraClient.channelName });

      // Clear video elements
      if (localVideoRef.current) localVideoRef.current.innerHTML = '';
      if (remoteVideoRef.current) remoteVideoRef.current.innerHTML = '';

      leaveCall();
    });
  }, [agoraClient, setRemoteUser, socket, leaveCall]);

  // 🎤 Toggle Audio (Mute/Unmute)
  const toggleAudio = () => {
    if (agoraClient?.localTracks[1]) {
      if (isAudioMuted) {
        agoraClient?.localTracks[1].setEnabled(true);
      } else {
        agoraClient?.localTracks[1].setEnabled(false);
      }
      setIsAudioMuted(!isAudioMuted);
    }
  };

  // 📷 Toggle Video (Enable/Disable Camera)
  const toggleVideo = () => {
    if (agoraClient?.localTracks[0]) {
      if (isVideoMuted) {
        agoraClient?.localTracks[0].setEnabled(true);
      } else {
        agoraClient?.localTracks[0].setEnabled(false);
      }
      setIsVideoMuted(!isVideoMuted);
    }
  };

  if (agoraClient) {
    return (
      <div className="fixed inset-0 bg-black flex justify-center items-center">
        {/* Remote User Video (Fixed Size) */}
        <div className="relative w-full h-full md:w-[640px] md:h-[360px] bg-gray-900 rounded-lg overflow-hidden border border-white shadow-lg">
          {/* Remote User Video */}
          <div ref={remoteVideoRef} className="w-full h-full" />
          {!remoteUser?.videoTrack && (
            <p className="absolute inset-0 flex justify-center items-center text-white text-lg">
              Waiting for remote video...
            </p>
          )}

          {/* Remote Username (Top-Left Corner) */}
          {remoteUsername && (
            <p className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-md">
              {remoteUsername}
            </p>
          )}
        </div>

        {/* Local User Video (Fixed Size) - Bottom Right */}
        <div className="absolute bottom-6 right-6 w-[160px] h-[120px] bg-gray-800 rounded-lg overflow-hidden border border-white shadow-lg">
          {/* Local User Video */}
          <div ref={localVideoRef} className="w-full h-full" />
          {!agoraClient.localTracks[0] && (
            <p className="flex justify-center items-center text-white text-xs">
              Waiting for local video...
            </p>
          )}

          {/* Local Username (Bottom-Center) */}
          {localUserName && (
            <p className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded-md w-full text-center truncate">
              {localUserName}(ME)
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-gray-700 p-2 text-white rounded-full"
            onClick={toggleAudio}
          >
            {isAudioMuted ? <MicOff size={32} /> : <Mic size={32} />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-gray-700 p-2 text-white rounded-full"
            onClick={toggleVideo}
          >
            {isVideoMuted ? <VideoOff size={32} /> : <Video size={32} />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-red-700 p-2 text-white rounded-full"
            onClick={leaveCall}
          >
            <PhoneCall width={40} height={40} />
          </Button>
        </div>
      </div>
    );
  }
};

export default SingleVideoCall;
