import { yupResolver } from "@hookform/resolvers/yup";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useForm,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { linkFormSchema } from "../schemas/link";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/slices/globalSlice";
import _ from "lodash";
import { Outlet } from 'react-router-dom';
import LinkService from "./../../services/links"

interface Link {
  platform: string;
  link: string;
}

export interface LinksState {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: {
    filename: string;
    content: string;
    contentType: string;
  } | string;
  links: Link[]; // This should remain required
}

const initialState: LinksState = {
  firstName: "",
  lastName: "",
  email: "",
  avatar: undefined,
  links: [],
};

const LinksContext = createContext<{
  control: Control<LinksState, any> | null;
  errors: FieldErrors<LinksState>;
  handleSubmit: UseFormHandleSubmit<LinksState, undefined> | null;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<LinksState, "links">;
  fields: FieldArrayWithId<LinksState, "links", "id">[];
  setView: React.Dispatch<React.SetStateAction<"links" | "profile">>;
  view: "links" | "profile";
  setValue: UseFormSetValue<LinksState>
}>({
  control: null,
  errors: {},
  handleSubmit: null,
  move: () => {},
  remove: () => {},
  append: () => {},
  fields: [],
  setView: () => {},
  view: "links",
  setValue: () => {}
});


export const LinksProvider = () => {
  const [view, setView] = useState<"links" | "profile">("links");
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<LinksState>({
    resolver: yupResolver(linkFormSchema) as any,
    defaultValues: initialState,
  });

  
  useEffect(() => {
    if (_.get(errors, "links.root")) {
      dispatch(
      addMessage({
        type: "error",
        message: _.get(errors, "links.root.message", "Unexpected Error")
      }))
    }
  }, [errors])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const linkData = await LinkService.getSecureLink();
      
      reset(linkData); 
    } catch (error) {
      console.error(error);

      dispatch(
        addMessage({
          type: "error",
          message: _.get(
            error,
            "response.data.message",
            "Error to get the Link Data."
          ),
        })
      );
    }
  }
  

  const { fields, append, remove, move } = useFieldArray<LinksState>({
    control: control!,
    name: "links",
  });

  return (
    <LinksContext.Provider
      value={{
        control,
        errors,
        handleSubmit,
        fields,
        append,
        remove,
        move,
        view,
        setView,
        setValue
      }}
    >
      <Outlet />
      </LinksContext.Provider>
  );
};

export const useLinks = () => useContext(LinksContext);
