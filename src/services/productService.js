import { Product } from "../models/Product.js";

// Crear producto
export const createProduct = async (data) => {
  const newProduct = new Product(data);
  return await newProduct.save();
};

// Obtener productos con filtros, paginación y orden
export const getProducts = async ({ limit = 10, page = 1, sort, query }) => {
  // Armamos el filtro
  let filter = {};
  if (query) {
    if (query === "true" || query === "false") {
      // Filtrar por disponibilidad (status)
      filter.status = query === "true";
    } else {
      // Filtrar por categoría
      filter.category = query;
    }
  }

  // Opciones de paginación
  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    lean: true   // ✅ importante para Handlebars
  };

  // Orden por precio
  if (sort === "asc") options.sort = { price: 1 };
  if (sort === "desc") options.sort = { price: -1 };

  // Ejecutamos paginación
  const result = await Product.paginate(filter, options);

  // Devolvemos en el formato que pide la consigna
  return {
    status: "success",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
      ? `/api/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
      : null,
    nextLink: result.hasNextPage
      ? `/api/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
      : null
  };
};

// Obtener un producto por ID (con lean para que handlebars lo muestre)
export const getProductById = async (id) => {
  return await Product.findById(id).lean();  // ✅ importante
};

// Actualizar producto
export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true }).lean();
};

// Eliminar producto
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id).lean();
};


