import { router } from "./scripts/router";
import { verifyToken } from "../middleware/verifyToken"
import { verifyRole } from "../middleware/verifyRole";
import { createAnswer, getAnswer, deleteAnswer } from "../services/answerService"

router.post("/api/create", verifyToken, verifyRole, createAnswer);
router.get("/api/:id", verifyToken, getAnswer);
router.delete("/api/delete/:id", verifyToken, deleteAnswer);

module.exports = router;