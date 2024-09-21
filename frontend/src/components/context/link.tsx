import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, ReactNode, useContext } from 'react';
import { Control, FieldArrayWithId, FieldErrors, useFieldArray, UseFieldArrayAppend, UseFieldArrayMove, UseFieldArrayRemove, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { linkFormSchema } from '../schemas/link';

interface Link {
  platform: string;
  link: string;
}

interface LinksState {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: File;
  links: Link[];
}

const initialState: LinksState = {
  firstName: "",
  lastName: "",
  email: "",
  avatar: undefined,
  links: [],
};

const LinksContext = createContext<{
  control: Control<LinksState, any> | null
  errors: FieldErrors<LinksState>
  handleSubmit: UseFormHandleSubmit<LinksState, undefined> | null
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<LinksState, "links">
  fields: FieldArrayWithId<LinksState, "links", "id">[]
}>({
  control: null,
  errors: {},
  handleSubmit: null,
  move: () => {},
  remove: () => {},
  append: () => {},
  fields: [],
});


export const LinksProvider = ({ children }: { children: ReactNode }) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LinksState>({
    resolver: yupResolver(linkFormSchema as any),
    defaultValues: initialState,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: control!,
    name: "links",
  });  

  return (
    <LinksContext.Provider value={{ control, errors, handleSubmit, fields, append, remove, move }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => useContext(LinksContext);
