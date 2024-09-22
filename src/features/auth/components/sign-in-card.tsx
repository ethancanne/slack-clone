import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
  CardHeader,
  Card,
  CardDescription,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { SignInFlow } from '../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';

interface Props {
  setState: (state: SignInFlow) => void;
}

type Inputs = {
  email: string;
  password: string;
};

const SignInCard = ({ setState }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => onPasswordSignIn(data);
  const { signIn } = useAuthActions();

  const [pending, setPending] = useState(false);
  const onPasswordSignIn = (e: Inputs) => {
    console.log(errors);

    setPending(true);
    signIn('password', {
      email: watch('email'),
      password: watch('password'),
      flow: 'signIn',
    })
      .catch((e) => setError('root', { message: 'Invalid email or password' }))
      .finally(() => setPending(false));
  };

  const onProviderSignIn = (value: 'google' | 'github') => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to Continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue.
        </CardDescription>
      </CardHeader>
      {!(Object.keys(errors).length === 0) && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-3">
          <TriangleAlert className="size-5" />
          <p>{errors.root?.message}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5 " onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="email"
            required
            type="email"
            disabled={pending}
            {...register('email')}
          />
          <Input
            placeholder="Password"
            required
            type="password"
            disabled={pending}
            {...register('password')}
          />
          <Button
            type="submit"
            className="w-full"
            size={'lg'}
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            variant={'outline'}
            size={'lg'}
            onClick={() => {
              onProviderSignIn('google');
            }}
            className="relative w-full"
          >
            <FcGoogle className="size-5 absolute left-2.5 top-3" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => {
              onProviderSignIn('github');
            }}
            variant={'outline'}
            size={'lg'}
            className="relative w-full"
          >
            <FaGithub className="size-5 absolute left-2.5 top-3" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don't have an account?{' '}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState('signUp')}
          >
            Sign Up
          </span>
        </p>{' '}
      </CardContent>
    </Card>
  );
};

export default SignInCard;
