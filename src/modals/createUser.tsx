import { Loader, TextInputBox, Select } from "@/components";
import { useFormik } from "formik";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { createUserSchema } from "@/utils/schema";
import { CreateUserFormikProps } from "@/@types/formik";
import { CreateUserModalProps } from "@/@types/modal";
import { useAppDispatch } from "@/store";
import { useUserListData } from "@/utils/storeData";
import { storeUserData } from "@/store/reducers/user.reducer";
import { generateUniqueString } from "@/utils/helper";
import { GenderProps } from "@/@types/general";
import StateAndCitiesList from "@/json/stateAndCity.json";

const genderOptions: GenderProps[] = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "others", name: "Others" },
];

const CreateUser = forwardRef(
  ({ data, onClose }: CreateUserModalProps, ref) => {
    const dispatch = useAppDispatch();
    const usersList = useUserListData();
    const isMount = useRef<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cityList, setcityList] = useState([]);

    const {
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      setValues,
    } = useFormik<CreateUserFormikProps>({
      initialValues: {
        name: "",
        email: "",
        gender: null,
        linkedinUrl: "",
        address: {
          line1: "",
          line2: "",
          city: null,
          state: null,
          pincode: "",
        },
      },
      validationSchema: createUserSchema,
      onSubmit(values) {
        if (data) {
          handleUpdateUser(values);
        } else {
          handleCreateUser(values);
        }
      },
    });

    useEffect(() => {
      if (data) {
        setValues(data);
      }
    }, [data]);

    const handleUpdateUser = (data: CreateUserFormikProps) => {
      if (isMount.current) {
        setIsLoading(true);
      }

      setTimeout(() => {
        if (isMount.current) {
          dispatch(
            storeUserData(
              usersList.map((user: CreateUserFormikProps) =>
                user.id === data.id ? { ...user, ...data } : user
              )
            )
          );
          toast.success("User updated successfully!");
          onClose();
          setIsLoading(false);
        }
      });
    };

    const handleCreateUser = (data: CreateUserFormikProps) => {
      if (isMount.current) {
        setIsLoading(true);
      }

      setTimeout(() => {
        if (isMount.current) {
          dispatch(
            storeUserData([
              ...usersList,
              { ...data, id: generateUniqueString() },
            ])
          );
          toast.success("User created successfully!");
          onClose();
          setIsLoading(false);
        }
      }, 1500);
    };

    useImperativeHandle(ref, () => ({
      submitForm: handleSubmit,
    }));

    return (
      <>
        <TextInputBox
          value={values.name}
          title="Name"
          isRequired
          onChangeText={handleChange("name")}
          errorText={errors.name && touched.name ? errors.name : ""}
          maxLength={50}
        />

        <TextInputBox
          value={values.email}
          title="Email"
          isRequired
          onChangeText={handleChange("email")}
          errorText={errors.email && touched.email ? errors.email : ""}
          maxLength={100}
        />

        <Select
          value={values.gender}
          options={genderOptions}
          onChange={(val) => {
            setFieldValue("gender", val);
          }}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item.id}
          title="Gender"
          isSearchable={false}
          isClearable
          errorText={errors.gender && touched.gender ? errors.gender : ""}
        />

        <TextInputBox
          value={values.linkedinUrl}
          title="LinkedIn URL"
          isRequired
          onChangeText={handleChange("linkedinUrl")}
          errorText={
            errors.linkedinUrl && touched.linkedinUrl ? errors.linkedinUrl : ""
          }
          maxLength={150}
        />

        <TextInputBox
          value={values.address.line1}
          title="Address Line 1"
          isRequired
          onChangeText={handleChange("address.line1")}
          errorText={
            errors.address?.line1 && touched.address?.line1
              ? errors.address.line1
              : ""
          }
          maxLength={100}
        />

        <TextInputBox
          value={values.address.line2}
          title="Address Line 2"
          onChangeText={handleChange("address.line2")}
          errorText={
            errors.address?.line2 && touched.address?.line2
              ? errors.address.line2
              : ""
          }
          maxLength={100}
        />

        <Select
          value={values?.address?.state}
          options={Object.keys(StateAndCitiesList).map((state, index) => ({
            id: index + 1,
            name: state,
          }))}
          onChange={(val) => {
            setValues((prev: any) => {
              return {
                ...prev,
                address: {
                  ...prev.address,
                  state: val,
                  city: null,
                },
              };
            });
            //@ts-ignore
            const cities = StateAndCitiesList[val.name] || [];
            const tempList = cities.map((city: string, index: number) => ({
              id: index + 1,
              name: city,
            }));
            setcityList(tempList);

            if (!val) {
              setFieldValue("address.city", null);
            }
          }}
          getOptionLabel={(item) => item?.name}
          getOptionValue={(item) => item?.id}
          title="State"
          isSearchable={false}
          isClearable
          isRequired
          errorText={
            errors.address?.state && touched.address?.state
              ? errors.address.state
              : ""
          }
        />

        <Select
          value={values?.address?.city}
          options={cityList}
          onChange={(val) => {
            setFieldValue("address.city", val);
          }}
          getOptionLabel={(item) => item?.name}
          getOptionValue={(item) => item?.id}
          title="City"
          isSearchable={false}
          isClearable
          isRequired
          errorText={
            errors.address?.city && touched.address?.city
              ? errors.address.city
              : ""
          }
        />

        <TextInputBox
          value={values.address.pincode}
          title="Pincode"
          isRequired
          onChangeText={handleChange("address.pincode")}
          errorText={
            errors.address?.pincode && touched.address?.pincode
              ? errors.address.pincode
              : ""
          }
          onKeyPress={(e) => {
            if (!(e.key === "0" || parseInt(e.key))) {
              e.preventDefault();
            }
          }}
          maxLength={10}
        />

        <Loader isVisible={isLoading} />
      </>
    );
  }
);

export default CreateUser;
