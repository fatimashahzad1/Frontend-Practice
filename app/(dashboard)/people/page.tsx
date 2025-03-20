"use client";
import { PeopleCard } from "@/components/dashboard/people/people-card";
import Spinner from "@/components/icons/spinner";
import { Input } from "@/components/ui/input";
import usePeople from "@/hooks/use-people";
import { Search } from "lucide-react";
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
    searchString,
    setSearchString,
    searchedPeopleIsLoading,
  } = usePeople();

  console.log({ people, loading, error });

  return (
    <div className="px-5 flex-1 bg-white sm:bg-backgroundGrey ">
      <div className="relative w-full bg-[#EEF4FD] sm:bg-white rounded-3xl mt-6">
        {/* Search Icon */}
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BEBEBE]"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search people..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="pl-10 w-full bg-[#EEF4FD] sm:bg-white rounded-3xl placeholder:text-[#BEBEBE] h-[40px] sm:h-[50px] focus-visible:outline-none focus-visible:ring-3" // Adjust padding for icon spacing
        />
      </div>
      <div className="sm:grid w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-5 sm:p-8 justify-center items-center gap-6">
        {(loading || searchedPeopleIsLoading) && <Spinner />}
        {people?.map((user, index) => (
          <PeopleCard
            key={index}
            title={user.name}
            description={user.email}
            actionTitle={user.isFollowedByCurrentUser ? "Unfollow" : "Follow"}
            imageUrl={user.pictureUrl}
            actionButtonClasses={
              user.isFollowedByCurrentUser
                ? "border-pinkRed text-pinkRed hover:text-pinkRed"
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
    </div>
  );
};

export default People;
