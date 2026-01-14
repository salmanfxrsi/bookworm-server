"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
router.get("/", review_controller_1.getReviews);
router.post("/", review_controller_1.createReview);
router.put("/:id", review_controller_1.updateReview);
router.delete("/:id", review_controller_1.deleteReview);
exports.default = router;
//# sourceMappingURL=review.routes.js.map