import bcrypt from "bcryptjs";
import mongoose from "../config/mongoose.config.js";

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  avatar: String,
  deletedAt: {
    type: Date,
    default: null
  },
}, {
  methods: {
    async hashCompare(string) {
      return bcrypt.compare(string, this.password)
    }
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
