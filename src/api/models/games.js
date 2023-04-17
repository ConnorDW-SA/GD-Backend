import mongoose from "mongoose";

const initialBoardState = {
  a1: { color: "white", type: "rook" },
  b1: { color: "white", type: "knight" },
  c1: { color: "white", type: "bishop" },
  d1: { color: "white", type: "queen" },
  e1: { color: "white", type: "king" },
  f1: { color: "white", type: "bishop" },
  g1: { color: "white", type: "knight" },
  h1: { color: "white", type: "rook" },
  a2: { color: "white", type: "pawn" },
  b2: { color: "white", type: "pawn" },
  c2: { color: "white", type: "pawn" },
  d2: { color: "white", type: "pawn" },
  e2: { color: "white", type: "pawn" },
  f2: { color: "white", type: "pawn" },
  g2: { color: "white", type: "pawn" },
  h2: { color: "white", type: "pawn" },
  a7: { color: "black", type: "pawn" },
  b7: { color: "black", type: "pawn" },
  c7: { color: "black", type: "pawn" },
  d7: { color: "black", type: "pawn" },
  e7: { color: "black", type: "pawn" },
  f7: { color: "black", type: "pawn" },
  g7: { color: "black", type: "pawn" },
  h7: { color: "black", type: "pawn" },
  a8: { color: "black", type: "rook" },
  b8: { color: "black", type: "knight" },
  c8: { color: "black", type: "bishop" },
  d8: { color: "black", type: "queen" },
  e8: { color: "black", type: "king" },
  f8: { color: "black", type: "bishop" },
  g8: { color: "black", type: "knight" },
  h8: { color: "black", type: "rook" }
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
        a1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        b1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        c1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        d1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        e1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        f1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        g1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        h1: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        a2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        b2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        c2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        d2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        e2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        f2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        g2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        h2: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        a7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        b7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        c7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        d7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        e7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        f7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        g7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        h7: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        a8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        b8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        c8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        d8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        e8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        f8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        g8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        },
        h8: {
          type: { type: String, required: false },
          color: { type: String, required: false }
        }
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
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);
