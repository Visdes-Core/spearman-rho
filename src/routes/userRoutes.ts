import { router } from "../scripts/router";

import { getUserById, getAllUsers } from '../services/userServices'

router.get("/list", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
