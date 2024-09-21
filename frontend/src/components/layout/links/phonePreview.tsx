import React from "react";
import Phone from "../../../assets/Phone";
import { Box } from "@mui/material";
import test from "./../../../assets/test.jpg"
import { platforms } from "../../../utils/const/plataforms";
import { useLinks } from "../../context/link";

export default function PhonePreview() {
  const {fields} = useLinks()
  console.log("🚀 ~ PhonePreview ~ fields:", fields)


  
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
        {fields.length > 0 ? (
          <Box position={"absolute"} top={"278px"} left={"36px"} >
            {fields.map(link => {
              const platform = platforms.find(platform => platform.name === link.platform)
              return (
                <Box 
                style={{background: platform?.color}} 
                width={"235px"} 
                height={"43px"} 
                padding={"10px"} 
                display={"flex"} 
                alignItems={"center"} 
                color={"white"}
                borderRadius={"7px"}
                marginBottom={"22px"}
                >
                  {platform && 
                  <Box marginRight={"6px"}>
                    <platform.icon color={false}/>
                  </Box>
                  }
                {link.platform}
                </Box>
              )
            })}
          </Box>
        ) : null}
      </Box>

    </Box>
  );
}
