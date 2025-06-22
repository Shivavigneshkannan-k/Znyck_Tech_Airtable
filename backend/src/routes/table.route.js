import { Router } from "express"
const router = Router();
import asyncHandler from "../utils/asyncHandler.js";
import { userAuth } from "../middleware/user.middleware.js";
import { addRow, createTable, getTables,getTable, removeRow, updateRow } from "../controllers/table.controller.js";

router.post("/create",asyncHandler(userAuth),asyncHandler(createTable));

router.get("/get",asyncHandler(userAuth),asyncHandler(getTables));

router.post("/add/row",asyncHandler(userAuth),asyncHandler(addRow));

router.get("/get/:tableId",asyncHandler(userAuth),asyncHandler(getTable));

router.delete("/edit/row/:tableId/:rowId",asyncHandler(userAuth),asyncHandler(removeRow));

router.patch("/edit/row/:tableId/:rowId",asyncHandler(userAuth),asyncHandler(updateRow));

export default router;