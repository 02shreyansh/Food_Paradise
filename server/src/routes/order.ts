import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createCheckoutSession, getOrder, stripeWebhook } from "../controllers/order";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrder);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({type: 'application/json'}), stripeWebhook);

export default router;