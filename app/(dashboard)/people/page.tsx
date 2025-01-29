"use client";
import { PeopleCard } from "@/components/dashboard/people/people-card";
import usePeople from "@/hooks/use-people";
import React from "react";

const People = () => {
  const {
    people,
    loading,
    error,
    followPerson,
    unfollowPerson,
    followPersonLoading,
    unfollowPersonLoading,
  } = usePeople();

  console.log({ people, loading, error });

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-backgroundGrey p-8 justify-center items-center gap-6">
      {people?.map((user, index) => (
        <PeopleCard
          key={index}
          title={user.name}
          description={user.email}
          actionTitle={user.isFollowedByCurrentUser ? "Unfollow" : "Follow"}
          actionButtonClasses={
            user.isFollowedByCurrentUser
              ? "border-pinkRed text-pinkRed hover:text-pinkRed "
              : "border-primaryBlue text-primaryBlue hover:text-primaryBlue"
          }
          action={() => {
            user.isFollowedByCurrentUser
              ? unfollowPerson(user.id)
              : followPerson(user.id);
          }}
          actionDisabled={followPersonLoading || unfollowPersonLoading}
        />
      ))}
    </div>
  );
};

export default People;
