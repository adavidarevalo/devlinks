import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { linkFormSchema } from "../components/link/form/schema";
import { FormValues } from "../components/link/form";

export const useLinkForm = () => {
  const linksState = useSelector((state: RootState) => state.links);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(linkFormSchema as any),
    defaultValues: {
      links: [...linksState.links], // Shallow copy to avoid mutations
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "links",
  });

  return { control, handleSubmit, errors, fields, append, remove, move };
};
