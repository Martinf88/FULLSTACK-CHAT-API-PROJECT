import Joi from "joi";
import { User } from "../models/userModel";

type ValidationResult = ValidationSuccess | ValidationFailure;

interface ValidationSuccess {
  success: true;
  value: User;
}

interface ValidationFailure {
  success: false;
  error: string;
}

const UserSchema: Joi.ObjectSchema<User> = Joi.object<User>({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
});

async function validateUser(newMessage: User): Promise<ValidationResult> {
  const { error, value } = UserSchema.validate(newMessage);
  return error
    ? { success: false, error: error.details[0].message }
    : { success: true, value };
}

export { UserSchema, validateUser };
