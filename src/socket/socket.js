import UserModel from "../api/models/users.js";

let onlineUsers = [];

export const newConnectionHandler = (newClient) => {
  console.log("NEW CONNECTION:", newClient.id);

  newClient.on("setUserId", async (payload) => {
    console.log(payload);
    onlineUsers.push({ userId: payload.userId, socketId: newClient.id });
  
    const allUsers = await UserModel.find(
      { _id: { $ne: payload.userId } },
      { _id: 1 }
    );
  
    const filterOnlineOfflineUsers = (allUsers, onlineUsers) => {
      const onlineUsersIds = onlineUsers.map((user) => user.userId);
      const offlineUsers = allUsers.filter(
        (user) => !onlineUsersIds.includes(user._id.toString())
      );
  
      return { onlineUsers, offlineUsers };
    };
  
    const { onlineUsers: onlineList, offlineUsers } = filterOnlineOfflineUsers(
      allUsers,
      onlineUsers
    );
    
    newClient.emit("loggedIn", { onlineUsers: onlineList, offlineUsers });
    
    const { onlineUsers: updatedOnlineList, offlineUsers: updatedOfflineList } =
      filterOnlineOfflineUsers(allUsers, onlineUsers);
    
    newClient.broadcast.emit("updateOnlineUsersList", {
      onlineUsers: updatedOnlineList,
      offlineUsers: updatedOfflineList
    });
  });
  

  newClient.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== newClient.id);
    newClient.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
};
