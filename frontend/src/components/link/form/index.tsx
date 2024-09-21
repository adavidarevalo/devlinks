import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box, useTheme } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLinks } from "../../../store/slices/linksSlice";
import Header from "./header";
import Card from "./card";
import Footer from "./footer";
import { linkFormSchema } from "./schema";
import GetStartedComponent from "./getStarted";
import { useEffect } from "react";

export type FormValues = {
  links: { platform: string; link: string }[];
};

const LinkForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
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

  useEffect(() => {
    dispatch(setLinks({
        links: fields
      }));
  }, [fields])
  

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // dispatch(setLinks({
    //   links: [...data.links]
    // }));
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "10px 20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 130px)",
          padding: "10px 20px",
        }}
      >
        {/* Fixed Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header />
          <Button
            variant="outlined"
            onClick={() => append({ platform: "Github", link: "" })}
            disabled={fields.length >= 5}
            style={{
              marginBlock: "13px 20px",
              fontSize: "13px",
              fontWeight: "600",
              textTransform: "none",
              borderRadius: "8px",
              width: "100%",
              padding: "8px",
              cursor: fields.length >= 5 ? "not-allowed" : "pointer",
              color: fields.length >= 5 ? theme.palette.text.disabled : theme.palette.primary.main,
              borderColor: fields.length >= 5 ? theme.palette.text.disabled : theme.palette.primary.main,
            }}
          >
            + Add new link
          </Button>
        </Box>

        {/* Scrollable Cards Section */}
        <Box
          sx={{
            flexGrow: 1,
            marginBottom: "20px",
          }}
        >
          {fields.length === 0 ? (
            <GetStartedComponent/>
          ) : (
            <>
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="links">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((field, index) => (
                    <Card
                      control={control}
                      key={field.id}
                      field={field}
                      index={index}
                      remove={remove}
                      errors={errors}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        {/* Fixed Footer */}
        <Box sx={{ flexShrink: 0 }}>
          <Footer />
        </Box>
          </>
          )}
        </Box>

      </Box>
    </form>
  );
};

export default LinkForm;
