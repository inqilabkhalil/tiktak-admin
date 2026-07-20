import * as Yup from "yup";

export const categoryValidationSchema = Yup.object({
  title: Yup.string()
    .required("Basliq mutleqdir")
    .min(2, "En az 2 herf olmalidir"),
  description: Yup.string()
    .required("Aciqlama mutleqdir")
    .min(5, "En az 5 herf olmalidir"),
  image: Yup.string(),
});
