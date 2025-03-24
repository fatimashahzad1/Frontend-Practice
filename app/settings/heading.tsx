import React from 'react';

const Heading = ({ title }: { title: string }) => {
  return (
    <div className=" text-[#1A194D] font-bold text-3xl max-sm:font-semibold max-sm:text-xl">
      {title}
    </div>
  );
};

export default Heading;
