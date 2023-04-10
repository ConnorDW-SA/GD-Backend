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
    }
    // boardState: {
    //   type: Array,
    //   required: true,
    // },
    // currentPlayer: {
    //   type: String,
    //   enum: ['white', 'black'],
    //   required: true,
    // },
    // status: {
    //   type: String,
    //   enum: ['in-progress', 'finished'],
    //   required: true,
    //   default: 'in-progress',
    // },
    // winner: {
    //   type: String,
    //   enum: ['white', 'black', 'draw', null],
    //   default: null,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);
