import z from "zod";

export const signupValidationObject = z.object({
        body: z.object({
            email: z.string().email(),
            username: z.string(),
            password: z.string().min(8)
        })
    });

export const signinValidationObject = z.object({
       body: z.object({
           username: z.string(),
           password: z.string().min(8)
       })
   });

export function validationMiddleware(schema) {
    return (req, res, next) => {
        try {
            signupValidationObject.parse({
                body: req.body,
                quert: req.query,
                params: req.params
            });
            next();
        } catch (err) {
            console.error(err);
            res.status(400).send("incorrect credentials");
        } 
    }
}