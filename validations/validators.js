import { object, ref, string } from "yup";

export const validator = {
  registerSchemaUser: object({
    username: string().min(4, "name more than six").required("User is required"),
    password: string()
      .min(6, "password more than 6")
      .required("Password is required"),
    confirmPassword: string().oneOf([ref("password"), null], "Not Correct"),
  }),

  registerSchemaDoc: object({
    username: string().min(4, "name more than six").required("User is required"),
    password: string()
      .min(6, "password more than 6")
      .required("Password is required"),
    confirmPassword: string().oneOf([ref("password"), null], "Not Correct"),
    specialization: string().required("Specialization is required"),
  }),

  loginSchema: object({
    username: string().required("input username"),
    password: string().min(6, "password more than 6"),
  }),

  validate: (schema) => async (req, res, next) => {
    // code body
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errMsg = error.errors.map((item) => item);
      const errTxt = errMsg.join(",");
      console.log(errTxt);
      const mergeErr = new Error(errTxt);
      next(mergeErr);
    }
  },
};
