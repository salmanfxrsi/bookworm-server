"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorial_controller_1 = require("../controllers/tutorial.controller");
const router = (0, express_1.Router)();
router.get("/", tutorial_controller_1.getTutorials);
router.post("/", tutorial_controller_1.createTutorial);
router.put("/:id", tutorial_controller_1.updateTutorial);
router.delete("/:id", tutorial_controller_1.deleteTutorial);
exports.default = router;
//# sourceMappingURL=tutorial.route.js.map