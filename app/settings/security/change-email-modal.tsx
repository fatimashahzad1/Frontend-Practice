'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

const ChangeEmailModal = () => {
    const email = 'fatima@email.com';
    const [text, setText] = useState<string>(email);
    const [open, setOpen] = useState(false);
    return (
        <div className="border-[#EFEFFF] border-b-2 pb-6">
            <h2 className="text-xl font-bold text-black mt-14 mb-8">
                Email address
            </h2>
            <div className="flex justify-between items-center flex-wrap">
                <p className="text-lg">
                    Your email address is{' '}
                    <span className="font-bold">{text}</span>
                </p>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            className="text-[#1565D8] hover:text-[#1565D8]"
                        >
                            Change
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Change Email Address</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="username"
                                    className="text-right"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="url"
                                    placeholder="Enter URL"
                                    className="col-span-3"
                                    value={text}
                                    onChange={(e) => {
                                        setText(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Change
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ChangeEmailModal;
