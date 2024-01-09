import { Router } from "express";
import { errorHandler } from "../helpers";
import { withCollection } from "../middlewares";
const router = Router();

// import model and use where needed.

// need error handling middleware
router.get('/', withCollection('dbname', 'collectionname')(async (req, res) => {
    // get water samples
}))

router.use(errorHandler)

export { router }