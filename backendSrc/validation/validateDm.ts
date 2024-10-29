import Joi from 'joi';
import { DirectMessage } from '../models/directMessageModel';

type ValidationResult = ValidationSuccess | ValidationFailure;

interface ValidationSuccess {
    success: true;
    value: DirectMessage;
}

interface ValidationFailure {
    success: false;
    error: string;
}

const directMessageSchema: Joi.ObjectSchema<DirectMessage> = Joi.object<DirectMessage>({
    content: Joi.string().min(1).required(),
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
});

async function validateDirectMessage(newMessage: DirectMessage): Promise<ValidationResult> {
    const { error, value } = directMessageSchema.validate(newMessage);
    return error ? { success: false, error: error.details[0].message } : { success: true, value };
}

export { directMessageSchema, validateDirectMessage };
