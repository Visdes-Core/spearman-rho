import { router } from "./scripts/router";
import { verifyToken } from "../middleware/verifyToken"
import { verifyRole } from "../middleware/verifyRole"
import { roleSiswa, roleMahasiswa } from "../services/roleService";

router.post("/siswa", verifyToken, verifyRole, roleSiswa);
router.post("/mahasiswa", verifyToken, verifyRole, roleMahasiswa);

module.exports = router;