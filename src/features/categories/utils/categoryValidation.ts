import * as Yup from "yup";

export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .required("Basliq mutleqdir")
    .min(2, "En az 2 herf olmalidir"),
  description: Yup.string()
    .required("Aciqlama mutleqdir")
    .min(5, "En az 5 herf olmalidir"),
  img_url: Yup.string(),
});
