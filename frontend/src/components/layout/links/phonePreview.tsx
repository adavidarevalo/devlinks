import Phone from "../../../assets/Phone";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { platforms } from "../../../utils/const/plataforms";
import { useLinks } from "../../context/link";
import { useWatch } from "react-hook-form";
import _ from "lodash";

export default function PhonePreview() {
  const { control, fields, move } = useLinks();

  const links = useWatch({ control: control!, name: "links" });
  const firstName = useWatch({ control: control!, name: "firstName" });
  const lastName = useWatch({ control: control!, name: "lastName" });
  const email = useWatch({ control: control!, name: "email" });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  // Function to merge draggable styles to avoid flickering
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // Custom styles for the draggable item
    background: isDragging ? "lightgray" : "white",
    transition: "background-color 0.2s ease", // Smooth transition to avoid blinking
    ...draggableStyle, // Apply default styles from react-beautiful-dnd
  });

  return (
    <Box
      style={{
        borderRadius: "8px",
        background: "white",
        height: "calc(100vh - 100px)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        minHeight: "710px",
        position: "sticky", 
        top: 0
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box position={"relative"}>
        <Phone />
        {firstName || lastName ? (
          <Box
            position={"absolute"}
            top={"179px"}
            fontSize={"1.125rem"}
            fontWeight={"600"}
            textAlign={"center"}
            width={"80%"}
            left={"33px"}
            style={{ background: "white" }}
          >
            {firstName} {lastName}
          </Box>
        ) : null}
        {email ? (
          <Box
            position={"absolute"}
            top={"206px"}
            fontSize={".875rem"}
            fontWeight={"400"}
            textAlign={"center"}
            width={"80%"}
            left={"33px"}
            style={{ background: "white" }}
          >
            {email}
          </Box>
        ) : null}
        {fields.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="phoneLinks">
              {(provided) => (
                <Box
                  position={"absolute"}
                  top={"278px"}
                  left={"36px"}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {fields.map((link, index) => {
                    const platform = platforms.find(
                      (platform) =>
                        platform.name ===
                        _.get(links, `[${index}].platform`, link.platform)
                    );
                    return (
                      <Draggable
                        key={link.id}
                        draggableId={link.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{...getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            ),
                            backgroundColor: platform?.color,
                          }}
                            sx={{
                              width: "235px",
                              height: "43px",
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              color: "white",
                              borderRadius: "7px",
                              marginBottom: "21px",
                              backgroundColor: platform?.color,
                            }}
                          >
                            {platform && <platform.icon color={"white"} />}
                            <Box marginLeft={"5px"}>{platform?.name}</Box>
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Box>
    </Box>
  );
}
