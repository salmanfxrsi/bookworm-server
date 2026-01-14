"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reading_shelf_controller_1 = require("../controllers/reading_shelf.controller");
const router = (0, express_1.Router)();
router.get("/", reading_shelf_controller_1.getUserShelves);
router.post("/", reading_shelf_controller_1.addToShelf);
router.put("/:id", reading_shelf_controller_1.updateShelf);
router.delete("/:id", reading_shelf_controller_1.deleteShelf);
exports.default = router;
//# sourceMappingURL=reading_shelf.route.js.map