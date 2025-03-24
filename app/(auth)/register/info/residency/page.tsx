import LeftPanel from '@/components/auth/leftPanel';
import React from 'react';
import RegisterTemplate from '../../registerTemplate';
import ResidencyForm from './residencyForm';

const Residency = () => {
  return (
    <div className="flex flex-row h-screen">
      <LeftPanel />
      <RegisterTemplate
        backToLink="/register/info/personal"
        heading="Complete Your Profile!"
        text="For the purpose of industry regulation, your details are required."
        stepNumber="02"
        stepName="Residency Info."
      >
        <ResidencyForm />
      </RegisterTemplate>
    </div>
  );
};

export default Residency;
