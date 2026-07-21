import * as Yup from "yup";

export const campaignValidationSchema = Yup.object({
  title: Yup.string()
    .required("Başlıq mütləqdir")
    .min(2, "Ən az 2 hərf olmalıdır"),
  description: Yup.string()
    .required("Açıqlama mütləqdir")
    .min(5, "Ən az 5 hərf olmalıdır"),
  img_url: Yup.string(),
});
