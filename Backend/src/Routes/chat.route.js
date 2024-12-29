import { Router } from "express";
import { getAllMsg, markSeen, markSeenAllMsg, unreadMsg, userAllChats } from "../Controllers/chat.controller.js";
import verifyJwt from '../Middlewares/verifyJwt.middleware.js'
const router = Router()

router.route("/allUserChat").get(verifyJwt,userAllChats)
router.route("/getAllMsg/:friendId").get(verifyJwt,getAllMsg)
router.route("/markSeen/:messageId").put(verifyJwt,markSeen)
router.route("/markSeenAllMsg/:recieverId").put(verifyJwt,markSeenAllMsg)
router.route("/unreadMsg").get(verifyJwt,unreadMsg)


export default router