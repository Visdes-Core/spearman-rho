import { router } from "./scripts/router";
import { verifyToken } from "../middleware/verifyToken"
import { verifyRole } from "../middleware/verifyRole"
import { roleSiswa, roleMahasiswa, roleCheck} from "../services/roleService";

router.post("/siswa", verifyToken, verifyRole, roleSiswa);
router.post("/mahasiswa", verifyToken, verifyRole, roleMahasiswa);
router.get("/rolecheck", verifyToken, verifyRole, roleCheck);

module.exports = router;