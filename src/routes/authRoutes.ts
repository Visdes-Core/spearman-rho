import { loginService, signupService } from "../services/authServices";
import { router } from "./scripts/router";

router.post("/login", loginService);
router.post("/signup", signupService);

module.exports = router;
