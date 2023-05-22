import express from "express";
import createError from "http-errors";
import GameModel from "../models/games.js";
import UserModel from "../models/users.js";
import { jwtAuthMiddleware } from "../../auth/Auth.js";

const gamesRouter = express.Router();

// Get games

gamesRouter.get("/userGames", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const games = await GameModel.find({
      $or: [{ player1: req.user._id }, { player2: req.user._id }]
    }).populate("player1 player2");
    res.send(games);
  } catch (error) {
    next(error);
  }
});

// Create game

gamesRouter.post("/createGame", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const { player2 } = req.body;
    const player2User = await UserModel.findById(player2);
    if (!player2User) {
      return res.status(404).send({ error: "Player 2 not found" });
    }
    const existingGame = await GameModel.findOne({
      $or: [
        { player1: req.user._id, player2 },
        { player1: player2, player2: req.user._id }
      ]
    });

    if (existingGame) {
      console.log("A game between these players already exists");
      return res
        .status(400)
        .send({ error: "A game between these players already exists" });
    }

    const newGame = new GameModel({ player1: req.user._id, player2 });
    const { _id } = await newGame.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

// Get game by id

gamesRouter.get("/:gameId", jwtAuthMiddleware, async (req, res, next) => {
  console.log("Request received for game ID:", req.params.gameId);
  try {
    const game = await GameModel.findOne({
      _id: req.params.gameId,
      $or: [{ player1: req.user._id }, { player2: req.user._id }]
    }).populate("player1 player2");

    if (game) {
      res.send(game);
    } else {
      next(createError(404, "Game not found"));
    }
  } catch (error) {
    next(error);
  }
});

//

// Update game by id

gamesRouter.put("/:gameId", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const game = await GameModel.findOne({
      _id: req.params.gameId,
      $or: [{ player1: req.user._id }, { player2: req.user._id }]
    });

    if (!game) {
      next(createError(404, "Game not found"));
      return;
    }

    const currentPlayer =
      game.currentPlayer.toString() === game.player1.toString()
        ? game.player2
        : game.player1;

    if (
      req.body.currentPlayer !==
      (game.currentPlayer.color || req.body.currentPlayer)
    ) {
      next(createError(400, "Invalid current player value"));
      return;
    }

    const updatedGame = await GameModel.findOneAndUpdate(
      { _id: req.params.gameId },
      { ...req.body, currentPlayer },
      { new: true, runValidators: true }
    );

    res.send(updatedGame);
    console.log("User successfully updated game");
  } catch (error) {
    next(error);
  }
});

// Delete game by id

gamesRouter.delete("/:gameId", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const deletedGame = await GameModel.findOneAndDelete({
      _id: req.params.gameId,
      $or: [{ player1: req.user._id }, { player2: req.user._id }]
    });

    if (deletedGame) {
      res.send({ message: "Game deleted successfully" });
    } else {
      next(createError(404, "Game not found"));
    }
  } catch (error) {
    next(error);
  }
});

export default gamesRouter;
