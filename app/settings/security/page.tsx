import React from 'react';
import Heading from '../heading';
import ChangeEmailModal from './change-email-modal';
import ChangePassword from './change-password';
import DeleteAccount from './delete-account';

const Security = () => {
    return (
        <div className="min-h-screen py-8 md:py-16 md:pl-14 px-5 md:pr-4 max-md:w-full md:w-[597px]">
            <Heading title="Security" />
            <ChangeEmailModal />
            <ChangePassword />
            <DeleteAccount postsCount={1388} />
        </div>
    );
};

export default Security;
