export interface LoginType {
  email: string;
  password: string;
}

export interface GoogleLoginType {
  email: string;
  firstName: string;
  lastName: string;
  avatarImage: string;
  googleId: string;
  isVerified: true;
}
export interface OAuthProps {
  title: string;
}
export interface SignupType {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordType {
  email: string;
}

export interface ResetPasswordType {
  password: string;
}

export interface ForgotPasswordType {
  email: string;
}
