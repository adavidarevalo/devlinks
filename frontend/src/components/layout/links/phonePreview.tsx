import React from "react";
import Phone from "../../../assets/Phone";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import test from "./../../../assets/test.jpg"
import { platforms } from "../../../utils/const/plataforms";
import { useLinks } from "../../context/link";

export default function PhonePreview() {
  const { fields, move } = useLinks();
  console.log("🚀 ~ PhonePreview ~ fields:", fields);

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };


  
  return (
    <Box
      style={{
        borderRadius: "8px",
        background: "white",
        height: "calc(100vh - 100px)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        minHeight: "710px",
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box  position={"relative"}>
        <Phone />
        <img src={test} style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "100%",
          position: "absolute",
          top: "59px",
          left: "102px"
        }}/> 
        <Box 
        position={"absolute"} 
        top={"179px"} 
        fontSize={"1.125rem"} 
        fontWeight={"600"}
        textAlign={"center"}
        width={"80%"}
        left={"33px"}
        style={{background: "white"}}
        >
          Ross Jackson
        </Box>

        <Box 
        position={"absolute"} 
        top={"206px"} 
        fontSize={".875rem"} 
        fontWeight={"400"}
        textAlign={"center"}
        width={"80%"}
        left={"33px"}
        style={{background: "white"}}
        >
          test@test.com
        </Box>
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
                      (platform) => platform.name === link.platform
                    );
                    return (
                      <Draggable key={link.id} draggableId={link.id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: platform?.color,
                              width: "235px",
                              height: "43px",
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              color: "white",
                              borderRadius: "7px",
                              marginBottom: "22px",
                              ...provided.draggableProps.style,
                            }}
                          >
                            {platform && (
                              <Box marginRight={"6px"}>
                                <platform.icon color={false} />
                              </Box>
                            )}
                            {link.platform}
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
