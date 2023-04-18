import mongoose from "mongoose";

const initialBoardState = {
  whiteRooks: ["a1", "h1"],
  whiteKnights: ["b1", "g1"],
  whiteBishops: ["c1", "f1"],
  whiteQueen: ["d1"],
  whiteKing: ["e1"],
  whitePawns: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  blackRooks: ["a8", "h8"],
  blackKnights: ["b8", "g8"],
  blackBishops: ["c8", "f8"],
  blackQueen: ["d8"],
  blackKing: ["e8"],
  blackPawns: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
};

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
      type: {
        whiteRooks: [{ type: String, required: true }],
        whiteKnights: [{ type: String, required: true }],
        whiteBishops: [{ type: String, required: true }],
        whiteQueen: [{ type: String, required: true }],
        whiteKing: [{ type: String, required: true }],
        whitePawns: [{ type: String, required: true }],
        blackRooks: [{ type: String, required: true }],
        blackKnights: [{ type: String, required: true }],
        blackBishops: [{ type: String, required: true }],
        blackQueen: [{ type: String, required: true }],
        blackKing: [{ type: String, required: true }],
        blackPawns: [{ type: String, required: true }]
      },
      required: true,
      default: initialBoardState
    },
    currentPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: function () {
        return this.player1;
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);

// status: {
//   type: String,
//   enum: ["in-progress", "finished"],
//   required: true,
//   default: "in-progress"
// },
// winner: {
//   type: String,
//   enum: ["white", "black", "draw", null],
//   default: null
// },
// moveHistory: [
//   {
//     from: { type: String, required: true },
//     to: { type: String, required: true },
//     piece: { type: String, required: true },
//     color: { type: String, enum: ["white", "black"], required: true },
//     capturedPiece: { type: String },
//     promotion: { type: String }
//   }
// ]
