module.exports.chatSocket = function(socketServer){
    const io = require("socket.io")(socketServer,{
        cors:{
            origin: "http://localhost:8000",
            method:[ "GET", "POST"]
        }
    });

    io.sockets.on("connection", function(socket){
        console.log("new connection recived", socket.id);

        socket.on("disconnect", function(){
            console.log("connection has been disconneted since app has been refreshed")
        })

        socket.on("join_room",function(data){
            console.log("joining request recived", data)

            socket.join(data.chatroom);

            io.in(data.chatroom).emit("user_joined", data)

        })

        socket.on("send_message", function(data){
            io.in(data.chatroom).emit("recieve_message",data)
        })


        

    })

  
}