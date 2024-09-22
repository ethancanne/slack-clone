'use client';

import { useState } from 'react';
import { SignInFlow } from '../types';
import SignUpCard from './sign-up-card';
import SignInCard from './sign-in-card';

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('signIn');
  return (
    <div className="h-full flex justify-center items-center bg-[#5c3858]">
      <div className="md:h-auto md:w-[420px] flex items-center justify-center">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
