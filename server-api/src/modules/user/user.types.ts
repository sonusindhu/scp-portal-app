export type UserProfilePayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  jobTitle?: string | null;
  department?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  extension?: string | null;
  userImage?: string | null;
};

export type UserPasswordPayload = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type UserDetail = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  extension?: string | null;
  userImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
