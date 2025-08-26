import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nextId } from '../utils/id.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDataPath = path.resolve(__dirname, '../../data/carts.json');

export class CartManager {
  constructor(filePath = defaultDataPath) {
    this.filePath = filePath;
  }

  async #ensureFile() {
    try { await fs.access(this.filePath); }
    catch {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, '[]', 'utf-8');
    }
  }

  async #readAll() {
    await this.#ensureFile();
    const raw = await fs.readFile(this.filePath, 'utf-8');
    try { return JSON.parse(raw || '[]'); }
    catch { await fs.writeFile(this.filePath, '[]'); return []; }
  }

  async #writeAll(list) {
    await fs.writeFile(this.filePath, JSON.stringify(list, null, 2), 'utf-8');
  }

  async createCart() {
    const list = await this.#readAll();
    const id = nextId(list.map(c => c.id));
    const cart = { id, products: [] };
    list.push(cart);
    await this.#writeAll(list);
    return cart;
  }

  async getCartById(id) {
    const list = await this.#readAll();
    return list.find(c => String(c.id) === String(id)) || null;
  }

  async listProducts(cid) {
    const cart = await this.getCartById(cid);
    if (!cart) throw new Error(`Carrito ${cid} no encontrado`);
    return cart.products;
  }

  async addProduct(cid, pid, qty = 1) {
    const list = await this.#readAll();
    const idx = list.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) throw new Error(`Carrito ${cid} no encontrado`);

    const q = Number(qty) > 0 ? Number(qty) : 1;
    const found = list[idx].products.find(p => String(p.product) === String(pid));
    if (found) found.quantity += q;
    else list[idx].products.push({ product: String(pid), quantity: q });

    await this.#writeAll(list);
    return list[idx];
  }
}

export default CartManager;
