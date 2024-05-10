import { router } from "./scripts/router";
import { verifyToken } from "../middleware/verifyToken"
import { verifyRole } from "../middleware/verifyRole"
import { getQuestions, createQuestion, deleteQuestion, upVoteQuestion } from "../services/questionServices";

router.post("/create", verifyToken, verifyRole, createQuestion);
router.get("/:id", verifyToken, getQuestions);
router.delete("/delete/:id", verifyToken, deleteQuestion);
router.get("/upvote/:id", verifyToken, upVoteQuestion);

module.exports = router;