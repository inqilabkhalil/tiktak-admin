import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  title: Yup.string()
    .required("Basliq mutleqdir")
    .min(2, "En az 2 herf olmalidir"),
  description: Yup.string()
    .required("Aciqlama mutleqdir")
    .min(5, "En az 5 herf olmalidir"),
  price: Yup.number()
    .typeError("Qiymeti daxil edin")
    .required("Qiymet mutleqdir")
    .min(0, "Qiymet menfi ola bilmez"),
  type: Yup.string().required("Olcu vahidini secin"),
  category_id: Yup.number()
    .typeError("Kateqoriya secin")
    .required("Kateqoriya secin")
    .min(1, "Kateqoriya secin"),
  img_url: Yup.string(),
});
