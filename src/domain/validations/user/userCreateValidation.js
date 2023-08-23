import z from 'zod';

const userCreateValidation = z.object({
    firstName: z.string().min(3).max(35),
    lastName: z.string().min(3).max(35),
    email: z.string().email().toLowerCase(),
    age: z.number().optional(),
    password: z.string()
});

export default userCreateValidation;
