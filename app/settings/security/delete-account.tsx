'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const DeleteAccount = ({ postsCount }: { postsCount: number }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h2 className="text-xl font-bold text-black mt-10 mb-8">
                Delete Account
            </h2>
            <p className="text-lg text-black">
                Would you like to delete your account?
            </p>
            <p className="text-lg text-black">
                This account contains 1388 posts. Deleting your account will
                remove all the content associated with it.
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="link"
                        className="text-[#EE4878] hover:text-[#EE4878] px-0 mt-10"
                    >
                        I want to delete my account
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you Sure?</DialogTitle>
                        <DialogDescription>
                            You want to delete your account?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DeleteAccount;
