import { FormikErrors } from "formik";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "solid" | "outline";
  onPress?: () => void;
  isDisabled?: boolean;
  isSolidEffect?: boolean;
  isOutlineEffect?: boolean;
}

type ScrollBehavior = "body" | "viewport";

type ModalSizeProps =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full"
  | "screen-sm"
  | "screen-md"
  | "screen-lg"
  | "screen-xl"
  | "screen-2xl";

export interface ModalProps {
  open: boolean;
  title?: string;
  isHeaderEnable?: boolean;
  isFooterEnable?: boolean;
  onCancel?: (isClose?: boolean) => void;
  onSubmit?: () => void;
  children: ReactNode;
  positiveBtnText?: string;
  negativeBtnText?: string;
  scrollBehavior?: ScrollBehavior;
  size?: ModalSizeProps;
}

type TextInputBoxOptionType = string | Record<string, any>;

export interface TextInputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  value: string;
  onChangeText?: (val: string) => void;
  type?: "text" | "password" | "email";
  isRequired?: boolean;
  errorText?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  isSecureText?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  options?: TextInputBoxOptionType[];
  onOptionSelect?: (selectedOption: TextInputBoxOptionType) => void;
  optionLabel?: string;
  getOptionLabel?: (option: TextInputBoxOptionType) => string;
}

export interface TextAreaBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  value: string;
  onChangeText?: (val: string) => void;
  isRequired?: boolean;
  errorText?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  rows?: number;
  cols?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface StyledTextProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  readMore?: boolean;
  maxLength?: number;
}

export interface LoaderProps {
  isVisible: boolean;
  text?: string;
}

export interface ColumnType<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  render?: (value?: any, record: T | number, index: number) => React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  width?: string | number;
}

export interface TablePaginationProps {
  current: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onChange: (page: number, pageSize: number) => void;
}

export interface TableProps<T> {
  columns: ColumnType<T>[];
  data: T[];
  rowKey?: keyof T;
  striped?: boolean;
  responsive?: boolean;
  className?: string;
  onRowClick?: (record: T, index: number) => void;
  pagination?: TablePaginationProps | false;
  isLoading?: boolean;
  headerActions?: Omit<TableHeaderProps, "children">;
  isHeaderEnable?: boolean;
  isShowSerialNo?: boolean;
  isSearchEnable?: boolean;
  searchText?: string;
  setSearchText?: (text: string) => void;
  isFilterEnable?: boolean;
  onPressFilter?: () => void;
  isLocalPaginate?: boolean;
  isExpandableRow?: boolean;
  renderExpandContent?: (record: T, index: number) => React.ReactNode;
}

export interface TableHeaderActionProps {
  id: string | number;
  icon: "Add" | "Refresh" | "Upload" | "Download" | "Filter";
  isDisabled?: boolean;
  label?: string;
}

export interface TableHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: TableHeaderActionProps[];
  onActionPress?: (action: TableHeaderActionProps) => void;
  customAction?: ReactNode;
  isAnimatedLabel?: boolean;
}

export interface OptionType {
  [key: string]: any;
}

type Placement = "bottom" | "top" | "left" | "right";

export interface SelectProps<T extends OptionType> {
  options: T[];
  value: T | T[] | null;
  onChange: (value: T | T[] | null) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
  menuPlacement?: Placement;
  className?: string;
  errorText?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isRequired?: boolean;
  title?: string;
  inputContainerStyle?: string;
  isCreate?: boolean;
  onCreateOption?: (label: string) => T;
  rightTitleText?: string;
  onRightTitleText?: () => void;
  createLabel?: string;
  isDisabled?: boolean;
}
