import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "El título es obligatorio"] },
    description: { type: String, required: [true, "La descripción es obligatoria"] },
    code: { type: String, unique: true, required: [true, "El código es obligatorio"] },
    price: { type: Number, required: [true, "El precio es obligatorio"], min: [0, "El precio no puede ser negativo"] },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: [true, "El stock es obligatorio"], min: [0, "El stock no puede ser negativo"] },
    category: { type: String, required: [true, "La categoría es obligatoria"] },
    thumbnails: { type: [String], default: [] }
  },
  { timestamps: true }
);

// ✅ Plugin de paginación
productSchema.plugin(mongoosePaginate);

// ✅ Exportar modelo
export const Product = mongoose.model("Product", productSchema);
