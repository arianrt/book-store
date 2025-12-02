import * as Yup from "yup";

export const bookSchema = Yup.object().shape({
  bookname: Yup.string().required("نام کتاب الزامی می باشد"),
  price: Yup.number().required("قیمت کتاب الزامی می باشد"),
  photo: Yup.string()
    .url("آدرس معتبر نیست")
    .required("تصویر کتاب الزامی می باشد"),
  group: Yup.string().required("انتخاب ژانر الزامی می باشد"),
});
