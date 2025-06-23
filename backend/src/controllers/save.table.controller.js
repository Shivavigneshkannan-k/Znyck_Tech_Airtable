import Table from "../models/table.model.js";
import Row from "../models/row.model.js";

const saveAsBatch = async (req, res, next) => {
  const table = req.table;
  const tableId = req.tableId;
  //deleting rows and fields can be done mostly seperately instead
  // of done as cummalative hence, it is best to use
  // seperate apis for deletion of rows and fields
  let {
    toUpdateFields,
    toAddFields,
    toUpdateRows,
    toAddRows
  } = req.body || {};

// deleting fields
//   const toDeleteFieldName = toDeleteFields.map((fieldId) => {
//     return table.fields.id(fieldId).name;
//   });
//   await Table.updateOne(
//     { _id: tableId },
//     {
//       $pull: { fields: { _id: { $in: toDeleteFields } } }
//     }
//   );

  // update existing fields
  await Promise.all(
    toUpdateFields.forEach(async (fieldData) => {
      Table.updateOne(
        { _id: tableId, "fields._id": fieldData._id },
        {
          $set: {
            "fields.$.name": fieldData.name,
            "fields.$.type": fieldData.type,
            "fields.$.choices": fieldData.choices || [],
            "fields.$.default": fieldData.default || null,
            "fields.$.updatedAt": new Date(),
            "fields.$.required": fieldData.required || false,
            "fields.$.unique": fieldData.unique || false
          }
        }
      );
    })
  );

  //adding new fields
  await Table.updateOne(
    { _id: tableId },
    {
        $push: {"fields":{ $each:toAddFields}}
    }
  );



  res.status(200).json({ data: null });
};
export { saveAsBatch };
