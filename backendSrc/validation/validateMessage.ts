import Joi from "joi";
// import { ObjectId } from "mongodb";
import { Message } from "../models/messageModel.js";
// import { getChannelById, getUserById } from "../database/messageCollection.js";


type ValidationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
    success: true;
    value: Message;
}

interface ValidationFailure {
    success: false;
    error: string;
}


const newMessageSchema: Joi.ObjectSchema<Message> = Joi.object<Message>({
	content: Joi.string().min(1).required(),
	channelId: Joi.string().required(),
	senderId: Joi.string().allow(null),
	
})


async function validateMessage(newMessage: Message): Promise<ValidationResult>{
    const { error, value } = newMessageSchema.validate(newMessage);
	
    if (error) {
        return { success: false, error: error.details[0].message };
    }

    return { success: true, value };
}


export { newMessageSchema, validateMessage } 