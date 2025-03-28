import { Button } from '@/components/ui/button';
import { AUDIO, VIDEO } from '@/constants';
import { useSocketContext } from '@/contexts/socket-context';
import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { Mic, MicOff, PhoneCall, Video, VideoOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const SingleVideoCall: React.FC = () => {
  const {
    remoteTracks,
    setRemoteTracks,
    leaveCall,
    agoraClient,
    localUserName,
    remoteUsername,
    socket,
    callType,
    localTracks,
  } = useSocketContext();
  // State for mute/unmute and camera on/off
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const [isRemoteVideoAvailable, setIsRemoteVideoAvailable] = useState(false);
  const [isRemoteAudioAvailable, setIsRemoteAudioAvailable] = useState(false);

  useEffect(() => {
    if (callType === VIDEO && localTracks?.[0] && localVideoRef.current) {
      localTracks[0].play(localVideoRef.current);
    }
    if (localTracks?.[1] && localVideoRef.current) {
      localTracks[1].play(localVideoRef.current);
    }
  }, [localTracks]);

  useEffect(() => {
    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: 'audio' | 'video'
    ) => {
      try {
        await agoraClient?.subscribe(user, mediaType);
        setRemoteTracks(user);
        console.log('user in handle publish===', user);

        if (mediaType === 'video' && callType === VIDEO) {
          const videoTrack = user.videoTrack;
          if (videoTrack && remoteVideoRef.current) {
            await videoTrack.play(remoteVideoRef.current);

            setIsRemoteVideoAvailable(user?.hasVideo);
          }
        }

        if (mediaType === 'audio') {
          const audioTrack = user.audioTrack;
          if (audioTrack) {
            await audioTrack.play();

            setIsRemoteAudioAvailable(user?.hasVideo);
          }
        }
      } catch (error) {
        console.error('Error handling published media:', error);
      }
    };

    const handleUserUnpublished = async (user: any, mediaType: string) => {
      try {
        console.log('user in handle unpublish===', user);
        setRemoteTracks(user);
        if (mediaType === 'video') {
          remoteTracks?.videoTrack?.stop();
          setIsRemoteVideoAvailable(user?.hasVideo);
        }
        if (mediaType === 'audio') {
          remoteTracks?.audioTrack?.stop();
          setIsRemoteAudioAvailable(user?.hasAudio);
        }
      } catch (error) {
        console.error('Error handling unpublished media:', error);
      }
    };

    const handleUserLeft = () => {
      // Cleanup remote tracks
      remoteTracks?.videoTrack?.stop();
      remoteTracks?.audioTrack?.stop();
      setRemoteTracks(null);

      socket?.emit('leaveCall', { channelName: agoraClient?.channelName });
      leaveCall();
    };

    // Add event listeners
    agoraClient?.on('user-published', handleUserPublished);
    agoraClient?.on('user-unpublished', handleUserUnpublished);
    agoraClient?.on('user-left', handleUserLeft);

    // Cleanup
    return () => {
      remoteTracks?.videoTrack?.stop();
      remoteTracks?.audioTrack?.stop();
      agoraClient?.off('user-published', handleUserPublished);
      agoraClient?.off('user-unpublished', handleUserUnpublished);
      agoraClient?.off('user-left', handleUserLeft);
    };
  }, [agoraClient, callType, remoteTracks]);

  // 🎤 Toggle Audio (Mute/Unmute)
  const toggleAudio = () => {
    if (localTracks[0]) {
      if (isAudioMuted) {
        localTracks[0].setEnabled(true);
      } else {
        localTracks[0].setEnabled(false);
      }
      setIsAudioMuted(!isAudioMuted);
    }
  };

  // 📷 Toggle Video (Enable/Disable Camera)
  const toggleVideo = () => {
    if (localTracks[1]) {
      if (isVideoMuted) {
        localTracks[1].setEnabled(true);
      } else {
        localTracks[1].setEnabled(false);
      }
      setIsVideoMuted(!isVideoMuted);
    }
  };

  if (localTracks && callType === VIDEO) {
    return (
      <div className="fixed inset-0 bg-black flex justify-center items-center">
        {/* Remote User Video (Fixed Size) */}
        <div className="relative w-full h-full md:w-[640px] md:h-[360px] bg-gray-900 rounded-lg overflow-hidden border border-white shadow-lg">
          {/* Remote User Video */}
          <div ref={remoteVideoRef} className="w-full h-full" />
          {!isRemoteVideoAvailable ? (
            <VideoOff
              size={60}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          ) : null}

          {/* Remote Username (Top-Left Corner) */}
          {remoteUsername && (
            <p className="absolute flex flex-row gap-2 items-center justify-center top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-md">
              {remoteUsername}
              {isRemoteAudioAvailable ? (
                <Mic size={14} />
              ) : (
                <MicOff size={14} />
              )}
            </p>
          )}
        </div>

        {/* Local User Video (Fixed Size) - Bottom Right */}
        <div className="absolute bottom-6 right-6 w-[160px] h-[120px] bg-gray-800 rounded-lg overflow-hidden border border-white shadow-lg">
          {/* Local User Video */}
          <div ref={localVideoRef} className="w-full h-full" />
          {!localTracks[1] && (
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

  if (localTracks && callType === AUDIO) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col justify-center items-center">
        {/* Remote User Info */}
        <div className="relative w-full max-w-sm bg-gray-800 rounded-lg p-4 text-center shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {remoteUsername?.charAt(0).toUpperCase() || 'U'}
            </div>
            <p className="text-white text-lg font-semibold mt-4">
              {remoteUsername || 'Unknown User'}
            </p>
            <p className="text-gray-400 text-sm mt-1 flex gap-2">
              Voice Call {!isRemoteAudioAvailable && <MicOff size={14} />}
            </p>
          </div>
        </div>

        {/* Local User Info */}
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            You ({localUserName || 'Unknown'}) are on the call
          </p>
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
            className="bg-red-700 p-2 text-white rounded-full"
            onClick={leaveCall}
          >
            <PhoneCall width={40} height={40} />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default SingleVideoCall;
