'use client';
import React from 'react';
import Heading from '../heading';
import ChangeEmailModal from './change-email-modal';
import ChangePassword from './change-password';
import useDeleteUser from '@/hooks/use-delete-user';
import useUser from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import DeleteModal from './delete-modal';

const Security = () => {
  const { mutate: deleteUser } = useDeleteUser();
  const { data: user } = useUser();
  return (
    <div className="min-h-screen py-8 md:py-16 md:pl-14 px-5 md:pr-4 max-md:w-full md:w-[597px]">
      <Heading title="Security" />
      <ChangeEmailModal />
      <ChangePassword />

      <div>
        <h2 className="text-sm md:text-xl font-bold text-black mt-8 md:mt-10 mb-3 md:mb-8">
          Delete Account
        </h2>
        <p className="text-sm md:text-lg text-black">
          Would you like to delete your account?
        </p>
        <p className="text-sm md:text-lg text-black">
          This account contains {user?._count?.posts} posts. Deleting your
          account will remove all the content associated with it.
        </p>
        <DeleteModal
          handleOnDelete={() => deleteUser(user?.id)}
          trigger={
            <Button
              variant="link"
              className="text-[#EE4878] hover:text-[#EE4878] px-0 py-0 mt-4 md:mt-10"
            >
              I want to delete my account
            </Button>
          }
          title="Are you Sure?"
          description="You want to delete your account?"
        />
      </div>
    </div>
  );
};

export default Security;
