export interface CreateAndEditStateProps<T = any> {
  status: boolean;
  data: T | null;
}

export interface DeleteConfirmationStateProps<T = any> {
  status: boolean;
  data: T | null;
}

export interface PaginationStateProps {
  totalPages: number;
  currentPage: number;
  size: number;
}

export interface FormRefProps {
  submitForm: () => void;
}

export interface GenderProps {
  id: string;
  name: string;
}
