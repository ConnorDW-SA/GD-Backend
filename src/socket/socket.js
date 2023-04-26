export const newConnectionHandler = (newClient) => {
  console.log("NEW CONNECTION:", newClient.id);
  newClient.emit("welcome", { message: `Hello ${newClient.id}` });

  newClient.on("join game", (gameId) => {
    console.log(`Client ${newClient.id} joined game ${gameId}`);
    newClient.join(gameId);
    newClient.to(gameId).emit("player joined", { playerId: newClient.id });
  });

  newClient.on("player move", ({ gameId, moveInfo }) => {
    console.log(
      `Client ${newClient.id} made a move in game ${gameId}. Current turn: ${moveInfo.currentTurn}`
    );
    newClient.to(gameId).emit("opponent move", moveInfo);
  });

  newClient.on("make move", ({ gameId, move }) => {
    console.log(`Client ${newClient.id} made move ${move} in game ${gameId}`);
    newClient.to(gameId).emit("opponent move", { move });
  });

  newClient.on("disconnect", () => {
    newClient.broadcast.emit("User disconnected");
  });
};
