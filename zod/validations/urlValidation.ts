import { z } from "zod";

const urlValidation = z.string({ invalid_type_error: "invalid url" }).url();
export default urlValidation;
