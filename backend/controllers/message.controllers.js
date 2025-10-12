import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";


import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;
    const { message } = req.body;

    // console.log("Sender:", sender);
    // console.log("Receiver:", receiver);
    // console.log("Message:", message);
    // console.log("File:", req.file);

    let image;
    if (req.file) {
      try {
        image = await uploadOnCloudinary(req.file.path);
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error:", uploadErr);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id]
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    const receicerSocketId = getReceiverSocketId(receiver)
    if(receicerSocketId){
      io.to(receicerSocketId).emit("newMessage", newMessage)
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getMessages = async (req, res) => {
    try {
        let sender = req. userId;
        let receiver = req.params.receiver;
        let conversation = await Conversation.findOne({
        participants: { $all: [sender, receiver] }
        }).populate("messages");

        if (!conversation) {
        return res.status(400).json({ message: "conversation not found" });
        }

        return res.status(200).json(conversation?.messages);
    } catch (error) {
        return res.status(500).json({ message: `Error getting message: ${error}` });
    }
};
