import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import FormInput from "../form/input";
import { MdOutlineEmail } from "react-icons/md";
import LockIcon from "../../assets/platforms/LockIcon";
import SubmitButton from "../form/submitButton";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "./../../services/auth";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addMessage } from "../../store/slices/globalSlice";
import { setStorage } from "../../utils/localstorage";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true); // Set loading to true when submission starts
    try {
      const user = await AuthenticationService.login({
        username: data.email,
        password: data.password,
      });

      setStorage("IdToken", _.get(user, "IdToken"));
      setStorage("RefreshToken", _.get(user, "RefreshToken"));
      setStorage("AccessToken", _.get(user, "AccessToken"));

      dispatch(
        addMessage({
          type: "success",
          message: "Login successful.",
        })
      );
      navigate("/links");
    } catch (error) {
      console.error(error);
      dispatch(
        addMessage({
          type: "error",
          message: _.get(error, "response.data.message", "Error logging in."),
        })
      );
    } finally {
      setLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <FormInput
        name="email"
        control={control}
        errors={errors}
        Icon={<MdOutlineEmail />}
        label={"Email address"}
      />

      <FormInput
        name="password"
        control={control}
        errors={errors}
        Icon={<LockIcon />}
        label={"Password"}
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
      />
      <SubmitButton
        text={loading ? "Logging in..." : "Log in"}
        disabled={loading}
      />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#633CFF",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Create account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
