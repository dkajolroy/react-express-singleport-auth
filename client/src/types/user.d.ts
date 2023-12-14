interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  image: string | null;
  isEmailVarify: boolean;
  isPhoneVarify: boolean;
  created_at: string;
  updated_at: string;
}
