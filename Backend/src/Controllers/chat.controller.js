import Message from '../Models/message.model.js'
import Chat from '../Models/chat.model.js'
import User from '../Models/User.model.js'

const userAllChats = async (req, res) => {
  const userId = req?.user?._id;

  if (!userId) {
    return res.status(401).json({ Message: "Unauthorized Access" });
  }

  try {
    const conversations = await Chat.find({
      participants: userId,
    })
      .select("-createdAt -messages -__v")
      .populate("participants", "-password -__v -socketId");

    // Remove  user from  participants list
    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
    });

    const conversationsWithUnreadCount = await Promise.all(
      conversations.map(async (conversation) => {

        const unreadCount = await Message.countDocuments({
          conversationId: conversation._id,
          reciever: userId,
          status: "Sent",
        });

        return {
          ...conversation.toObject(), 
          unreadCount,  
        };
      })
    );

    return res.status(200).json({
      Message: "All Chats Fetched Successfully",
      conversations: conversationsWithUnreadCount,
    });
  } catch (error) {
    console.error(error);  
    return res.status(500).json({ Message: "Internal Server Error in Fetching all Chats" });
  }
};

const getAllMsg = async(req,res) => {
  const userId = req?.user?._id
  if(!userId) {
    return res.status(400).json({Message : "Unathorized Access"})
  }
  const friendId = req.params?.friendId
  if(!friendId) {
    return res.status(400).json({Message : "Friend Id not provided"})
  }
  try {
    const chat = await Chat.findOne(
      {
        participants: { $all: [userId, friendId] },
      }
    ).select("-__v -createdAt -updatedAt -participants").populate("messages")

    return res.status(200).json({
      Message : "User-Friend Message Fetched Successfully",
      chat
    })
    
  } catch (error) {
    res.status(500).json({Message :"Error in finding Messages specific to friend" })
  }
}

const markSeen = async(req,res) => {
  const userId = req?.user?._id
  if(!userId) {
    return res.status(401).json({Message : "Unauthorized Access"})
  }
  const {messageId} = req?.params
  if(!messageId) {
    return res.status(400).json({Message : "Message Id not provided"})
  }
  try {
    await Message.findByIdAndUpdate(
      messageId,
      {
        $set: {status : "Read"}
      }
    )
    return res.status(200).json({Message : "Message Seen Updated Successfully"})
  } catch (error) {
    res.status(500).json({Message : "Internal Server Error in Updating Seen Messages"})
  }
}

const markSeenAllMsg = async (req, res) => {
  const userId = req?.user?._id;
  
  if (!userId) {
    return res.status(401).json({ Message: "Unauthorized Access" });
  }

  const { recieverId } = req?.params;
  
  if (!recieverId) {
    return res.status(400).json({ Message: "Receiver Id not provided" });
  }

  try {
    const result = await Message.updateMany(
      {
        sender: recieverId,
        reciever: userId,
      },
      {
        $set: { status: "Read" },
      }
    );    

    if (result.nModified === 0) {
      return res.status(404).json({ Message: "No messages to update" });
    }

    return res.status(200).json({ Message: "All messages marked as read" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: "Internal Server Error in Updating All Seen Messages" });
  }
};

const unreadMsg = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({message : "Unauthorized access"})
  }

  try {
    const message = await Message.find({
      reciever : userId,
      status : 'Sent'
    })

    return res.status(200).json(
      {
        message : "Fetched Unread messages Successfully",
        unreadCount : message.length
      }
    )
  } catch (error) {
    console.error("Error in fetching unread messages", error)
    return res.status(500).json({message : "Internal server error in fetching unread message"})
  }
}


export {
  userAllChats,
  getAllMsg,
  markSeen,
  markSeenAllMsg,
  unreadMsg
}