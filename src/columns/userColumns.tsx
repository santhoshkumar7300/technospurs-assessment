import { ColumnType } from "@/@types/components";
import { presence } from "@/utils/helper";
import { StyledText } from "@/components";
import { Pencil, Trash2 } from "lucide-react";

export const columns = (
  onPressEdit: (row: any) => void,
  onPressDelete: (row: any) => void
): ColumnType<any>[] => [
  {
    key: "name",
    title: "Name",
    align: "center",
    dataIndex: "name",
    render: (name) => <StyledText className="m-0">{presence(name)}</StyledText>,
  },
  {
    key: "email",
    title: "Email",
    align: "center",
    dataIndex: "email",
    render: (email) => (
      <StyledText className="m-0">{presence(email)}</StyledText>
    ),
  },
  {
    key: "linkedin",
    title: "LinkedIn URL",
    align: "center",
    dataIndex: "linkedinUrl",
    render: (linkedinUrl) => (
      <StyledText className="m-0">{presence(linkedinUrl)}</StyledText>
    ),
  },
  {
    key: "gender",
    title: "Gender",
    align: "center",
    dataIndex: "gender",
    render: (gender) => (
      <StyledText className="m-0">{presence(gender?.name)}</StyledText>
    ),
  },
  // {
  //   key: "address",
  //   title: "Address",
  //   align: "center",
  //   dataIndex: "address",
  //   render: (address) => (
  //     <StyledText className="m-0">{presence(address)}</StyledText>
  //   ),
  // },
  {
    key: "manage",
    title: "Action",
    align: "center",
    render: (row) => (
      <div className="flex items-center justify-center gap-3">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onPressEdit?.(row);
          }}
          className="p-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 cursor-pointer transition"
          title="Edit"
        >
          <Pencil size={16} />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onPressDelete?.(row);
          }}
          className="p-2 rounded-md border border-red-500 text-red-500 hover:bg-red-100 cursor-pointer transition"
          title="Delete"
        >
          <Trash2 size={16} />
        </div>
      </div>
    ),
  },
];
