import * as z from "zod";

export const UserValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});

export const promtSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: "Minimum 10 characters." })
    .max(50, { message: "Maximum 50 caracters." }),
});

export const historyValidation = z.object({
  workoutName: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
});
