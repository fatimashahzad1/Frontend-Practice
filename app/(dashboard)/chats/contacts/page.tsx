'use client';
import SingleVideoCall from '@/components/dashboard/chats/single-video-call';
import Spinner from '@/components/icons/spinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSocketContext } from '@/contexts/socket-context';
import useGetAllFollowedUsers from '@/hooks/use-get-all-followed-users';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MessageCircle, Phone, Video } from 'lucide-react';
import React from 'react';

const ChatContacts = () => {
    const { data, isLoading } = useGetAllFollowedUsers();
    const { socket } = useSocketContext();
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className='w-full'>
            {data?.following?.map((user) => {
                return (
                    <Card
                        key={user.id}
                        className={
                            'px-4 py-3 flex items-center gap-3 cursor-pointer transition border-none rounded-none shadow-none bg-white hover:bg-blue-100 bg-[#EEF4FD]'
                        }
                    >
                        <Avatar className='w-10 h-10 '>
                            <AvatarImage
                                className='rounded-full'
                                src='https://github.com/shadcn.png'
                            />
                            <AvatarFallback className=' w-10 h-10 flex justify-center items-center rounded-full'>
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <div className='flex justify-between w-full'>
                                <h3 className='text-sm font-bold text-black'>
                                    {user.name}
                                </h3>
                                <div className='flex flex-row gap-8'>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='h-7'
                                    >
                                        <MessageCircle height={20} />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='h-7'
                                    >
                                        <Phone height={20} />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='h-7'
                                        onClick={() => {
                                            socket?.emit('callUser', {
                                                callerId: data.id,
                                                callerName: data.name,
                                                receiverId: user.id,
                                                receiverName: user.name,
                                            });
                                        }}
                                    >
                                        <Video height={20} />
                                    </Button>
                                </div>
                            </div>
                            <p className='text-xs text-[#475467]'>
                                {user?.email}
                            </p>
                        </div>
                    </Card>
                );
            })}
            <SingleVideoCall />
        </div>
    );
};

export default ChatContacts;
