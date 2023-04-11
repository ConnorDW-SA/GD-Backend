import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    player1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    player2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    boardState: {
      type: Array,
      required: true
    },
    currentPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["in-progress", "finished"],
      required: true,
      default: "in-progress"
    },
    winner: {
      type: String,
      enum: ["white", "black", "draw", null],
      default: null
    },
    moveHistory: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
        piece: { type: String, required: true },
        color: { type: String, enum: ["white", "black"], required: true },
        capturedPiece: { type: String },
        promotion: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);
