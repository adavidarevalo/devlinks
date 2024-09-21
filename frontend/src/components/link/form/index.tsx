import { Formik, FieldArray, Form } from "formik";
import { Button, Box, useTheme } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLinks } from "../../../store/slices/linksSlice";
import Header from "./header";
import Card from "./card";
import Footer from "./footer";
import { linkFormSchema } from "./schema";


const LinkForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const linksState = useSelector((state: RootState) => state.links);
  return (
    <Formik
      initialValues={linksState}
      validationSchema={linkFormSchema}
      onSubmit={(values) => {
        console.log("🚀 ~ onSubmit ~ values:", values);
        dispatch(setLinks(values));
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ padding: "10px 20px" }}>
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
          <FieldArray
            name="links"
            render={({ push, remove }) => (
              <>
                <Button
                  variant="outlined"
                  onClick={() => push({ platform: "", link: "" })}
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
                <Box
                  sx={{
                    flexGrow: 1,
                    marginBottom: "20px",
                  }}
                >
                  {values.links.map((link, index) => (
                    <Card
                      key={index}
                      field={link}
                      index={index}
                      remove={remove}
                      errors={errors}
                      handleChange={handleChange}
                    />
                  ))}
                </Box>
              </>
            )}
          />
        </Box>

        {/* Fixed Footer */}
        <Box sx={{ flexShrink: 0 }}>
          <Footer />
        </Box>
      </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LinkForm;
