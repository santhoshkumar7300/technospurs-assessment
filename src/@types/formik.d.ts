import { GenderProps } from "./general";

export interface CreateUserFormikProps {
  name: string;
  email: string;
  gender: GenderProps | null;
  linkedinUrl: string;
  address: {
    line1: string;
    line2: string;
    city: StateAndCityDataProps | null;
    state: StateAndCityDataProps | null;
    pincode: string;
  };
  id?: string;
}

export interface StateAndCityDataProps {
  id: number;
  name: string;
}
