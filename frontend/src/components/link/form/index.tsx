import { Button, Box, useTheme } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "./header";
import Card from "./card";
import Footer from "./footer";
import GetStartedComponent from "./getStarted";
import { useLinks } from "../../context/link";

export type FormValues = {
  links: { platform: string; link: string }[];
};

const LinkForm = () => {
  const theme = useTheme();

  const {fields, move, append, handleSubmit} = useLinks()



  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("🚀 ~ onSubmit ~ data:", data)

  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <form onSubmit={handleSubmit?.(onSubmit)} style={{ padding: "10px 20px" }}>
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
                      key={field.id}
                      field={field}
                      index={index}
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
