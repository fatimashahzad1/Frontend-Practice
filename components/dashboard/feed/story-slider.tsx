'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { storyVideos } from '@/mocks/dashboard';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function StorySlider() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className='flex gap-4 overflow-x-auto custom-scrollbar'>
            {/* Create Story Card */}

            <Card className=' min-w-[163px] h-[294px] flex flex-col items-center justify-start bg-gray-200 rounded-[20px]'>
                <Image
                    src='/assets/dashboard/create-story.png'
                    alt='Video Thumbnail'
                    className=' object-cover rounded-md'
                    width={163}
                    height={200}
                />
                <div className='relative bottom-3 w-[30px] h-[30px] bg-[#1565D8] rounded-full flex items-center justify-center shadow-md'>
                    <Plus className='text-white' size={24} />
                </div>
                <CardContent className='text-center'>Create Story</CardContent>
            </Card>

            {/* Video Cards */}
            {storyVideos.map((video) => (
                <Card
                    key={video.id}
                    className='relative min-w-[163px] h-[294px] cursor-pointer rounded-[20px]'
                    onClick={() => setSelectedVideo(video.videoUrl)}
                >
                    <Image
                        src={video.thumbnail}
                        alt='Video Thumbnail'
                        className='w-full h-full object-cover rounded-md'
                        width={163}
                        height={294}
                    />
                    <Image
                        src={video.creator}
                        alt='Creator Avatar'
                        className='absolute top-2 right-2  rounded-full border-2 border-white'
                        width={55}
                        height={55}
                    />
                </Card>
            ))}
            <Dialog
                open={!!selectedVideo}
                onOpenChange={() => setSelectedVideo(null)}
            >
                <DialogContent className='sm:max-w-[425px]'>
                    {selectedVideo && (
                        <video
                            src={selectedVideo}
                            controls
                            autoPlay
                            className='w-full h-auto'
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
