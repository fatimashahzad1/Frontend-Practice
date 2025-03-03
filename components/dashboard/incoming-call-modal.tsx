import { useSocketContext } from '@/contexts/socket-context';

const IncomingCallModal = () => {
    const { incomingCall, acceptCall, rejectCall } = useSocketContext();
    if (!incomingCall) return null; // Don't render if no call

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-lg font-semibold'>Incoming Call</h2>
                <p>{incomingCall.callerName} is calling...</p>
                <div className='flex mt-4 space-x-4'>
                    <button
                        onClick={acceptCall}
                        className='bg-green-500 text-white px-4 py-2 rounded'
                    >
                        Accept
                    </button>
                    <button
                        onClick={rejectCall}
                        className='bg-red-500 text-white px-4 py-2 rounded'
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomingCallModal;
