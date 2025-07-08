import * as Yup from 'yup';
const validatonSchema = Yup.object().shape({
    email:Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
        password:Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
})

export default validatonSchema;