import React from 'react';
import Heading from '../heading';
import NotificationForm from './notifications-form';

const Notifications = () => {
    return (
        <div className="min-h-screen py-8 md:py-16 md:pl-14 px-5 md:pr-4 w-full">
            <Heading title="Notifications" />
            <NotificationForm />
        </div>
    );
};

export default Notifications;
