import { CallbackContainer } from './containers/auth/callback.container';
import { LoginContainer } from './containers/auth/login.container';
import { SignUpContainer } from './containers/auth/signup.container';

export const routes = {
  SIGNUP: SignUpContainer,
  LOGIN: LoginContainer,
  CALLBACK: CallbackContainer,
};
