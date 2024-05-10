import { router } from "./scripts/router";

import { getUserById, getAllUsers } from '../services/userServices'

router.get("/get/list", getAllUsers);
router.get("/get/:id", getUserById);

module.exports = router;
