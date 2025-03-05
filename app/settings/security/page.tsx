import React from 'react';
import Heading from '../heading';
import ChangeEmailModal from './change-email-modal';
import ChangePassword from './change-password';
import DeleteAccount from './delete-account';

const Security = () => {
    return (
        <div className="mt-16 ml-14 max-sm:mt-8 max-sm:ml-5 mr-4 max-md:w-full md:w-[597px]">
            <Heading title="Security" />
            <ChangeEmailModal />
            <ChangePassword />
            <DeleteAccount postsCount={1388} />
        </div>
    );
};

export default Security;
