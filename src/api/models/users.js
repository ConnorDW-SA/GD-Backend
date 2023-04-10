import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 100,
      trim: true
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const newUser = this;
    const plainPW = newUser.password;
    if (newUser.isModified("password")) {
      newUser.password = await bcrypt.hash(plainPW, 10);
    }
    next();
  });
  
  UserSchema.methods.toJson = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  };
  
  UserSchema.static("checkCredentials", async function (email, plainPW) {
    const user = await this.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(plainPW, user.password);
      if (isMatch) return user;
      else return null;
    } else {
      return null;
    }
  });
  
  export default model("User", UserSchema);