import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
} from "react-hook-form";
import { FormValues } from ".";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import FormInput from "../../form/input";
import { IoIosArrowDown } from "react-icons/io";
import { platforms } from "../../../utils/const/plataforms";

interface CardProps {
  field: FieldArrayWithId<FormValues, "links", "id">;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
}

export default function Card({
  control,
  field,
  index,
  remove,
}: CardProps) {
  return (
    <Draggable key={field.id} draggableId={field.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            border: "1px solid #e0e0e0",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px",
            backgroundColor: "#fff",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={"10px"}>
            <Typography variant="body1" fontWeight={600} color={"#737373"} fontSize={"1rem"}>= Link #{index + 1}</Typography>
            <Typography onClick={() => remove(index)} variant="body1" sx={{ cursor: 'pointer', '&:hover': { color: '#633cff' } }}>
              Remove
            </Typography>
          </Box>

          <Controller
            name={`links.${index}.platform`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                displayEmpty
                IconComponent={IoIosArrowDown} // Use your custom icon here
                style={{
                  display: "flex !important", 
                  alignItems: "center", 
                }}
                sx={{
                  textAlign: 'justify', 
                  '& .MuiSelect-icon': { color: '#633cff' }, 
                  border: '1px solid #e0e0e0', 
                  '&:hover': {
                    borderColor: '#633cff', 
                    boxShadow: '0 0 32px 0 rgba(99,60,255,0.25)', 
                  },
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }} // Arrow icon color, border color, box shadow, and transition
              >
                <MenuItem value="" disabled>
                  Select Platform
                </MenuItem>
                {platforms.map((platform) => (
                  <MenuItem key={platform.name} value={platform.name}>
                    <Box style={{marginRight: "5px"}}>
                    {<platform.icon/>}
                      </Box> {platform.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <FormInput
            name={`links.${index}.link`}
            label={"Link"}
            type="string"
            placeholder="e.g. https://github.com/johndoe"
          />
        </Box>
      )}
    </Draggable>
  );
}
