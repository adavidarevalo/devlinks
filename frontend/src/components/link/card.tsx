import { Draggable } from "react-beautiful-dnd";
import {
  Controller,
  FieldArrayWithId,
} from "react-hook-form";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import FormInput from "../form/input";
import { IoIosArrowDown } from "react-icons/io";
import { platforms } from "../../utils/const/plataforms";
import _ from "lodash";
import { useLinks } from "../context/link";
import { FormValues } from ".";

interface CardProps {
  field: FieldArrayWithId<FormValues, "links", "id">;
  index: number;
}

export default function Card({ field, index }: CardProps) {
  const { control, errors, remove } = useLinks();

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
            backgroundColor: "#FAFAFA",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={"10px"}>
            <Typography
              variant="body1"
              fontWeight={600}
              color={"#737373"}
              fontSize={"1rem"}
            >
              = Link #{index + 1}
            </Typography>
            <Typography
              onClick={() => remove(index)}
              variant="body1"
              sx={{ cursor: "pointer", "&:hover": { color: "#633cff" } }}
            >
              Remove
            </Typography>
          </Box>

          <Controller
            name={`links.${index}.platform`}
            control={control!}
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                displayEmpty
                IconComponent={IoIosArrowDown}
                sx={{
                  display: "flex !important",
                  alignItems: "center",
                  textAlign: "justify",
                  "& .MuiSelect-icon": { color: "#633cff" },
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    borderColor: "#633cff",
                    boxShadow: "0 0 32px 0 rgba(99,60,255,0.25)",
                  },
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {platforms.map((platform) => (
                  <MenuItem key={platform.name} value={platform.name}>
                   <Box display={"flex"}>
                   <Box style={{ marginRight: "5px" }}>
                      {<platform.icon color={"#737373"}/>}
                    </Box>
                    {platform.name}
                   </Box>
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {_.get(errors, `links.[${index}].platform`) && (
            <Typography variant="body2" color="error">
              {_.get(errors, `links.[${index}].platform.message`)}
            </Typography>
          )}

          <FormInput
            name={`links[${index}].link`}
            label={"Link"}
            type="string"
            control={control}
            placeholder="e.g. https://github.com/johndoe"
            errors={errors}
          />
        </Box>
      )}
    </Draggable>
  );
}
