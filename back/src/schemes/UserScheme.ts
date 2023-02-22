import { Schema, model, Types } from "mongoose";
import UserEntity from "../entity/UserEntity";

const UserScheme = new Schema<UserEntity>(
  {
    nameUser: { type: String, required: true, unique: true },
    emailUser: { type: String, required: true, unique: true, lowercase: true },
    passwordUser: { type: String, required: true },
    typeUser: { type: Number, enum: [1, 2], default: 1 },
  },

  { versionKey: false }
);

export default model("User", UserScheme, "User");