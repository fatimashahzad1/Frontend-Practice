import { useSocketContext } from '@/contexts/socket-context';
import { Video, Phone } from 'lucide-react'; // Icons for video and voice calls

const IncomingCallModal = () => {
  const { incomingCall, acceptCall, rejectCall, callType } = useSocketContext();

  if (!incomingCall) return null; // Don't render if no call

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="flex items-center space-x-4">
          {/* Icon based on call type */}
          {callType === 'VIDEO' ? (
            <Video className="text-blue-500 w-10 h-10" />
          ) : (
            <Phone className="text-green-500 w-10 h-10" />
          )}
          <h2 className="text-lg font-semibold">
            {callType === 'VIDEO'
              ? 'Incoming Video Call'
              : 'Incoming Voice Call'}
          </h2>
        </div>
        <p className="mt-2 text-gray-600">
          {incomingCall.callerName} is calling...
        </p>
        <div className="flex mt-6 space-x-4">
          <button
            onClick={acceptCall}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={rejectCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
