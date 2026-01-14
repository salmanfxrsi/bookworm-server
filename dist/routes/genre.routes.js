"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = require("../controllers/genre.controller");
const router = (0, express_1.Router)();
router.get("/", genre_controller_1.getGenres);
router.post("/", genre_controller_1.createGenre);
router.put("/:id", genre_controller_1.updateGenre);
router.delete("/:id", genre_controller_1.deleteGenre);
exports.default = router;
//# sourceMappingURL=genre.routes.js.map