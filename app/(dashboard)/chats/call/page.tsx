'use client';
import Spinner from '@/components/icons/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { CALL_STATUS } from '@/constants';
import useGetAllCalls from '@/hooks/use-get-all-calls';
import dayjs from 'dayjs';
import { MoveDownLeft, MoveUpRight } from 'lucide-react';
import React from 'react';

const ChatCall = () => {
    const { data, isLoading } = useGetAllCalls();
    console.log({ data });
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="w-full bg-[#EEF4FD]">
            <h2 className="mx-4 mt-4 text-xl font-bold">Contacts</h2>
            {data?.map((call) => (
                <Card
                    key={call.id}
                    className={
                        'px-4 py-3 flex items-center gap-3 cursor-pointer transition  rounded-none shadow-none hover:bg-blue-100 bg-[#EEF4FD] border-t-0 border-b-2 last:border-b-0'
                    }
                >
                    <Avatar className="w-10 h-10 ">
                        <AvatarImage
                            className="rounded-full"
                            src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback className=" w-10 h-10 flex justify-center items-center rounded-full">
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex justify-between w-full">
                            <h3 className="text-sm font-bold text-black">
                                {call.callSend
                                    ? call.receiver.name
                                    : call.initiator.name}
                            </h3>
                            <div className="flex flex-row gap-8">
                                {call.callSend ? (
                                    <MoveUpRight
                                        color={
                                            call.status === CALL_STATUS.RECEIVED
                                                ? 'green'
                                                : 'red'
                                        }
                                    />
                                ) : (
                                    <MoveDownLeft
                                        color={
                                            call.status === CALL_STATUS.RECEIVED
                                                ? 'green'
                                                : 'red'
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-[#475467]">
                            {dayjs(call.createdAt).format('MMMM D, h:mm A')}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ChatCall;
