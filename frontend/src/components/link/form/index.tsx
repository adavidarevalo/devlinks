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
      links: linksState.links
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "links",
  });

  console.log("fields ", fields)

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    dispatch(setLinks(data));
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
            onClick={() => append({ platform: "", link: "" })}
            style={{
              marginBlock: "13px 20px",
              fontSize: "13px",
              fontWeight: "600",
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              textTransform: "none",
              cursor: "pointer",
              borderRadius: "8px",
              width: "100%",
              padding: "8px",
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
        </Box>

        {/* Fixed Footer */}
        <Box sx={{ flexShrink: 0 }}>
          <Footer />
        </Box>
      </Box>
    </form>
  );
};

export default LinkForm;
