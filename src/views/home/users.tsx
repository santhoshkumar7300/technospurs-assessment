import { CreateUserFormikProps } from "@/@types/formik";
import {
  CreateAndEditStateProps,
  DeleteConfirmationStateProps,
  FormRefProps,
} from "@/@types/general";
import { columns } from "@/columns/userColumns";
import { Modal, StyledText, Table } from "@/components";
import CreateUser from "@/modals/createUser";
import { useAppDispatch } from "@/store";
import { storeUserData } from "@/store/reducers/user.reducer";
import { presence } from "@/utils/helper";
import { useUserListData } from "@/utils/storeData";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Users() {
  const dispatch = useAppDispatch();
  const isMount = useRef<boolean>(true);
  const userRef = useRef<FormRefProps>(null);
  const userList = useUserListData();
  const [deleteConfirmation, setdeleteConfirmation] = useState<
    DeleteConfirmationStateProps<any>
  >({
    status: false,
    data: null,
  });
  const [createAndUpdateUsers, setcreateAndUpdateUsers] = useState<
    CreateAndEditStateProps<any>
  >({
    status: false,
    data: null,
  });

  useEffect(() => {
    isMount.current = true;

    return () => {
      isMount.current = false;
    };
  }, []);

  const onEditPress = (data: any) => {
    if (isMount.current) {
      setcreateAndUpdateUsers({
        status: true,
        data,
      });
    }
  };

  const onDeletePress = (data: any) => {
    if (isMount.current) {
      setdeleteConfirmation({
        status: true,
        data,
      });
    }
  };

  const closeDeleteConfirmationModal = () => {
    if (isMount.current) {
      setdeleteConfirmation({
        status: false,
        data: null,
      });
    }
  };

  const closeCreateAndEditModal = () => {
    if (isMount.current) {
      setcreateAndUpdateUsers({
        status: false,
        data: null,
      });
    }
  };

  return (
    <>
      <Table<CreateUserFormikProps>
        columns={columns(onEditPress, onDeletePress)}
        data={userList}
        rowKey="id"
        responsive={true}
        striped={true}
        isExpandableRow
        renderExpandContent={(record) => (
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {record.address.line1 && (
                <div>
                  <StyledText as="span" className="font-semibold text-gray-700">
                    Line 1:
                  </StyledText>{" "}
                  {presence(record.address.line1)}
                </div>
              )}
              {record.address.line2 && (
                <div>
                  <StyledText as="span" className="font-semibold text-gray-700">
                    Line 2:
                  </StyledText>{" "}
                  {presence(record.address.line2)}
                </div>
              )}
              {record.address.city?.name && (
                <div>
                  <StyledText as="span" className="font-semibold text-gray-700">
                    City:
                  </StyledText>{" "}
                  {presence(record.address.city.name)}
                </div>
              )}
              {record.address.state?.name && (
                <div>
                  <StyledText as="span" className="font-semibold text-gray-700">
                    State:
                  </StyledText>{" "}
                  {presence(record.address.state.name)}
                </div>
              )}
              {record.address.pincode && (
                <div>
                  <StyledText as="span" className="font-semibold text-gray-700">
                    Pincode:
                  </StyledText>{" "}
                  {presence(record.address.pincode)}
                </div>
              )}
            </div>
          </div>
        )}
        headerActions={{
          title: "Users List",
          isAnimatedLabel: true,
          subtitle: "List of Users Here",
          actions: [{ id: 1, icon: "Add", label: "Add User" }],
          onActionPress: (action) => {
            if (action.id === 1) {
              if (isMount.current) {
                setcreateAndUpdateUsers({
                  status: true,
                  data: null,
                });
              }
            }
          },
        }}
      />
      <Modal
        size="xl"
        open={createAndUpdateUsers.status}
        onCancel={closeCreateAndEditModal}
        scrollBehavior="body"
        title={`${createAndUpdateUsers.data ? "Update" : "Create"} Users`}
        positiveBtnText={createAndUpdateUsers.data ? "Update" : "Create"}
        onSubmit={() => userRef.current?.submitForm()}
      >
        <CreateUser
          ref={userRef}
          data={createAndUpdateUsers.data}
          onClose={() => {
            closeCreateAndEditModal();
          }}
        />
      </Modal>
      <Modal
        title="Delete confirmation"
        positiveBtnText="Yes"
        negativeBtnText="No"
        open={deleteConfirmation.status}
        onCancel={closeDeleteConfirmationModal}
        onSubmit={() => {
          if (isMount.current) {
            dispatch(
              storeUserData(
                userList.filter(
                  (user: CreateUserFormikProps) =>
                    user.id !== deleteConfirmation.data.id
                )
              )
            );
            toast.success("User deleted successfully!");
          }
          closeDeleteConfirmationModal();
        }}
      >
        <StyledText>Are you sure want to delete this user?</StyledText>
      </Modal>
    </>
  );
}
