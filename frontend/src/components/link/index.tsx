import { Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import Header from "./header";
import Card from "./card";
import Footer from "./footer";
import GetStartedComponent from "./getStarted";
import { useLinks } from "../context/link";

export type FormValues = {
  links: { platform: string; link: string }[];
};

const LinkForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { fields, move, append, handleSubmit } = useLinks();

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const renderAddLinkButton = () => (
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
  );

  const renderCards = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef} minHeight={"55vh"}>
            {fields.map((field, index) => (
              <Card key={field.id} field={field} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );

  return (
    <form onSubmit={handleSubmit?.(onSubmit)} style={{ padding: "10px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: isMobile ? "5px" : "10px 20px",
        }}
      >
        {/* Fixed Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header />
          {!isMobile && renderAddLinkButton()}
        </Box>

        {/* Scrollable Cards Section */}
        <Box
          sx={{
            flexGrow: 1,
            marginBottom: "20px",
            overflowY: "auto", // Added to allow scrolling
          }}
        >
          {fields.length === 0 ? <GetStartedComponent /> : renderCards()}
        </Box>

        {/* Fixed Footer */}
        {fields.length !== 0 && <Footer />}
      </Box>
      {isMobile && (
        <Button
          variant="contained"
          onClick={() => append({ platform: "Github", link: "" })}
          disabled={fields.length >= 5}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            borderRadius: "50%",
            minWidth: "50px",
            minHeight: "50px",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            cursor: fields.length >= 5 ? "not-allowed" : "pointer",
          }}
        >
          <FaPlus />
        </Button>
      )}
    </form>
  );
};

export default LinkForm;
