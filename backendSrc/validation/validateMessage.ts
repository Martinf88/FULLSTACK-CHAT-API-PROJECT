import Joi from "joi";
import { ObjectId } from "mongodb";
import { Message } from "../models/messageModel.js";
import { getChannelById, getUserById } from "../database/messageCollection.js";


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
	content: Joi.string().required(),
	channelId: Joi.string().required(),
	senderId: Joi.string().required(),
	
})

const updateMessageSchema: Joi.ObjectSchema<Message> = Joi.object<Message>({
	content: Joi.string().optional(),
	channelId: Joi.string().optional(),
	senderId: Joi.string().optional(),
}).min(1)


async function validateSenderAndChannel(senderId: string, channelId: string): Promise<ValidationResult>{
    const userExist = await getUserById(senderId);
    const channelExist = await getChannelById(channelId);

    if (!userExist) {
        return { success: false, error: 'senderId not found' };
    }

    if (!channelExist) {
        return { success: false, error: 'channelId not found' };
    }

    return { success: true, value: { senderId, channelId } as Message };
}

async function validateMessage(newMessage: Message): Promise<ValidationResult>{
    const { error, value } = newMessageSchema.validate(newMessage);
	
    if (error) {
        return { success: false, error: error.details[0].message };
    }

    if (!ObjectId.isValid(value.senderId) || !ObjectId.isValid(value.channelId)) {
        return { success: false, error: 'Invalid senderId or channelId' };
    }

    const validation = await validateSenderAndChannel(value.senderId, value.channelId);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }

    return { success: true, value };
}

// async function validatePutCartItem(cartItem: CartModel, cartItemId: string): Promise<ValidationResult>{

// 	if (!ObjectId.isValid(cartItemId)) {
// 		return { success: false, error: 'Invalid cart item ID' }
// 	}

// 	const { error, value } = updateCartItemSchema.validate(cartItem);
// 	if (error) {
// 		return { success: false, error: error.details[0].message  }
// 	}

// 	const { userId, productId }: CartModel = value;
//     if (userId && productId) {
//         const validation = await validateUserAndProduct(userId, productId);
//         if (!validation.success) {
//             return { success: false, error: validation.error };
//         }
//     }
	
// 	return { success: true, value };
// }

export { newMessageSchema, updateMessageSchema, validateSenderAndChannel, validateMessage } 