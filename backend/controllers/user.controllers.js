import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res)=>{
    try {
        let userId = req.userId
        let user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`current user error ${error}`})
    }
};

// export const editProfile = async (req, res) => {
//     try {
//         let { name } = req.body;
//         let image;

//         if (req.file) {
//             onsole.log("Uploading file:", req.file.path);
//             image = await uploadOnCloudinary(req.file.path);
//             console.log("Uploaded to Cloudinary:", image);

//         }


//         let user = await User.findByIdAndUpdate(
//             req.userId,
//             name, 
//             image,
//             { new: true } // 🔥 This ensures you get the updated document
//         ).select("-password");

//         if (!user) {
//         return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json(user);
//     } catch (error) {
//         return res.status(500).json({ message: "Profile error", error });
//     }
// };


// import { uploadOnCloudinary } from "../config/cloudinary.js";
// import User from "../models/user.model.js";

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl;

    // Upload if a file exists
    if (req.file) {
      console.log("[editProfile] Received file:", req.file.path);
      imageUrl = await uploadOnCloudinary(req.file.path); // ⬅️ calling helper here
    }

    const update = {};
    if (name)     update.name  = name;
    if (imageUrl) update.image = imageUrl;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      update,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("[editProfile] Error:", err);
    return res.status(500).json({ message: "Profile error", error: err });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get other users error ${error}` });
  }
};

export const search = async(req, res)=>{
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(users);
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: `search user error ${error}` });
  
  }
}
