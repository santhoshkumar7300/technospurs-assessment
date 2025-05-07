import * as Yup from "yup";

export const createUserSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters")
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.object().required("Gender is required"),
  linkedinUrl: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      "Enter a valid LinkedIn URL"
    )
    .required("LinkedIn URL is required"),
  address: Yup.object().shape({
    line1: Yup.string()
      .required("Address Line 1 is required")
      .max(100, "Max 100 characters"),
    line2: Yup.string().max(100, "Max 100 characters").nullable(),
    city: Yup.object().required("City is required"),
    state: Yup.object().required("State is required"),
    pincode: Yup.string()
      .matches(/^[0-9]+$/, "Pincode must be numbers only")
      .min(4, "Pincode must be at least 4 digits")
      .max(10, "Pincode must be at most 10 digits")
      .required("Pincode is required"),
  }),
});
