import { Router } from "express";
const router = Router();
import asyncHandler from "../utils/asyncHandler.js";
import { userAuth } from "../middleware/user.middleware.js";
import {
  createTable,
  getTables,
  getTable,
  removeRow,
  updateRow,
  addRows,
  createField,
  updateField,
  deleteField
} from "../controllers/table.controller.js";
import {
  addRowMiddleware,
  fieldMiddleware
} from "../middleware/table.middleware.js";

router.post("/create", asyncHandler(userAuth), asyncHandler(createTable));

router.get("/get", asyncHandler(userAuth), asyncHandler(getTables));

router.post(
  "/add/rows/:tableId",
  asyncHandler(userAuth),
  asyncHandler(addRowMiddleware),
  asyncHandler(addRows)
);
router.post(
  "/add/field/:tableId",
  asyncHandler(userAuth),
  asyncHandler(fieldMiddleware),
  asyncHandler(createField)
);
router.patch(
  "/edit/field/:tableId",
  asyncHandler(userAuth),
  asyncHandler(fieldMiddleware),
  asyncHandler(updateField)
);
router.patch(
  "/delete/field/:tableId/:fieldId",
  asyncHandler(userAuth),
  asyncHandler(fieldMiddleware),
  asyncHandler(deleteField)
);

router.get("/get/:tableId", asyncHandler(userAuth), asyncHandler(getTable));

router.delete(
  "/delete/row/:tableId/:rowId",
  asyncHandler(userAuth),
  asyncHandler(removeRow)
);

router.patch(
  "/edit/row/:tableId/",
  asyncHandler(userAuth),
  asyncHandler(updateRow)
);

export default router;
