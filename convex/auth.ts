import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { convexAuth } from '@convex-dev/auth/server';
import { Password } from '@convex-dev/auth/providers/password';

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub, Google, Password],
});
