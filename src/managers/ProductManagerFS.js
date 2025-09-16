import { promises as fs } from "fs";
import path from "path";

const filePath = path.resolve("data/products.json");

export default class ProductManagerFS {
  async #ensureFile() {
    try {
      await fs.access(filePath);
    } catch {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, "[]", "utf-8");
    }
  }

  async #readAll() {
    await this.#ensureFile();
    const data = await fs.readFile(filePath, "utf-8");
    try {
      return JSON.parse(data || "[]");
    } catch {
      await fs.writeFile(filePath, "[]", "utf-8");
      return [];
    }
  }

  async #writeAll(list) {
    await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf-8");
  }

  #validateFields(payload, { allowPartial = false } = {}) {
    const required = ["title", "description", "code", "price", "status", "stock", "category"];
    if (!allowPartial) {
      for (const f of required) {
        if (payload[f] === undefined) {
          throw new Error(`Campo requerido faltante: ${f}`);
        }
      }
    }
    if (payload.thumbnails && !Array.isArray(payload.thumbnails)) {
      throw new Error("thumbnails debe ser un array de strings");
    }
  }

  async getAll() {
    return await this.#readAll();
  }

  async getById(id) {
    const list = await this.#readAll();
    return list.find((p) => String(p.id) === String(id)) || null;
  }

  async add(payload) {
    this.#validateFields(payload);
    const list = await this.#readAll();

    if (list.some((p) => p.code === payload.code)) {
      throw new Error(`Ya existe un producto con code="${payload.code}"`);
    }

    const id = list.length > 0 ? Math.max(...list.map((p) => Number(p.id))) + 1 : 1;
    const product = {
      id,
      title: String(payload.title),
      description: String(payload.description),
      code: String(payload.code),
      price: Number(payload.price),
      status: Boolean(payload.status),
      stock: Number(payload.stock),
      category: String(payload.category),
      thumbnails: Array.isArray(payload.thumbnails) ? payload.thumbnails : [],
    };

    list.push(product);
    await this.#writeAll(list);
    return product;
  }

  async update(id, updates) {
    if ("id" in updates) delete updates.id;
    this.#validateFields(updates, { allowPartial: true });

    const list = await this.#readAll();
    const idx = list.findIndex((p) => String(p.id) === String(id));
    if (idx === -1) throw new Error(`Producto ${id} no encontrado`);

    if (updates.code && list.some((p) => p.code === updates.code && String(p.id) !== String(id))) {
      throw new Error(`Ya existe otro producto con code="${updates.code}"`);
    }

    const updated = { ...list[idx], ...updates };
    if (updates.price !== undefined) updated.price = Number(updates.price);
    if (updates.status !== undefined) updated.status = Boolean(updates.status);
    if (updates.stock !== undefined) updated.stock = Number(updates.stock);
    if (updates.thumbnails !== undefined) {
      if (!Array.isArray(updates.thumbnails)) throw new Error("thumbnails debe ser un array");
      updated.thumbnails = updates.thumbnails;
    }

    list[idx] = updated;
    await this.#writeAll(list);
    return updated;
  }

  async delete(id) {
    const list = await this.#readAll();
    const idx = list.findIndex((p) => String(p.id) === String(id));
    if (idx === -1) throw new Error(`Producto ${id} no encontrado`);
    const [removed] = list.splice(idx, 1);
    await this.#writeAll(list);
    return removed;
  }
}
