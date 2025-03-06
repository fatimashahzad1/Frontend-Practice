'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import SettingsInput from '../settingsInput';
import { SettingsGeneralFormSchema } from '@/constants/schemas';
import {
    BIO_FIELD,
    DEFAULT_GENERAL_SETTINGS_VALUES,
    FIRST_NAME_FIELD,
    LAST_NAME_FIELD,
    LOCATION_FIELD,
    PROFESSION_FIELD,
} from '@/constants/form-fields';
import { CustomTextarea } from '../custom-textarea';
import OnlinePresenceModal from './online-presence-modal';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { ONLINE_PRESENCE_PLATFORMS_ICONS } from '@/constants/settings';
import ProfilePicture from './profile-picture';
import Heading from '../heading';

const GeneralForm = () => {
    const form = useForm<z.infer<typeof SettingsGeneralFormSchema>>({
        resolver: zodResolver(SettingsGeneralFormSchema),
        defaultValues: DEFAULT_GENERAL_SETTINGS_VALUES,
    });

    function onSubmit(values: z.infer<typeof SettingsGeneralFormSchema>) {
        console.log(values);
    }

    const links = form.watch('links') || [];
    console.log({ links });

    const removeLink = (platform: string, url: string) => {
        console.log('remove called');
        const existingLinks = form.getValues('links') || []; // Get existing links
        const updatedLinks = existingLinks.filter(
            (link) => link.platform !== platform && link.url !== url
        );
        form.setValue('links', updatedLinks);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <ProfilePicture />
                <div
                    className="flex flex-col md:flex-row gap-5"
                    style={{ marginTop: 0 }}
                >
                    <SettingsInput
                        control={form.control}
                        {...FIRST_NAME_FIELD}
                    />
                    <SettingsInput
                        control={form.control}
                        {...LAST_NAME_FIELD}
                    />
                </div>
                <SettingsInput control={form.control} {...LOCATION_FIELD} />
                <SettingsInput control={form.control} {...PROFESSION_FIELD} />
                <CustomTextarea control={form.control} {...BIO_FIELD} />

                {/* Online Presense */}
                <Heading title="Online presense" />
                <OnlinePresenceModal />

                {/* Display Selected Link */}
                {links.map((link, index) => {
                    return (
                        <div
                            key={`link-${index}`}
                            className="relative w-full h-[74px]  "
                        >
                            {ONLINE_PRESENCE_PLATFORMS_ICONS[link.platform]}

                            {/* Input field */}
                            <Input
                                value={`${link.platform}: ${link.url}`}
                                readOnly
                                className="pl-[70px] h-[74px] font-medium text-lg text-[#202142] border-[#C3C3E4] focus-visible:ring-0 focus-visible:ring-offset-0 "
                            />

                            <Trash2
                                className="absolute right-7 top-1/2 -translate-y-1/2 text-[#202142] cursor-pointer"
                                size={18}
                                type="button"
                                onClick={() =>
                                    removeLink(link.platform, link.url)
                                }
                            />
                        </div>
                    );
                })}

                <Button
                    variant="outline"
                    className="w-full bg-[#1565D8] h-12 text-base font-medium text-white rounded-[10px] mb-8"
                    type="submit"
                >
                    Update Changes
                </Button>
            </form>
        </Form>
    );
};

export default GeneralForm;
