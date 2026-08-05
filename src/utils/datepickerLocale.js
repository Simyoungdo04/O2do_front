import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ko } from "date-fns/locale";

registerLocale("ko", ko);
setDefaultLocale("ko");
