import mongoose from "mongoose";
const rowSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        values:{
            type: mongoose.Schema.Types.Mixed,
            required: true,
        }
    }
})

const Row = mongoose.model("Row",rowSchema);
export default Row;