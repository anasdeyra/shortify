import { z } from "zod";
import { urlValidation } from "../validations";

const linkSchema = z.object({
  short: z.string().min(1),
  origin: urlValidation,
});
export default linkSchema;
