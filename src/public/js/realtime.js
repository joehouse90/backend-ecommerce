// Cliente Socket.IO
const socket = io();

// 🔄 Renderizar productos en el DOM
function renderProducts(list) {
  const ul = document.getElementById("productsList");
  if (!ul) return;

  ul.innerHTML = "";
  list.forEach((p) => {
    const li = document.createElement("li");
    li.className = "card p-2 mb-2";
    li.setAttribute("data-id", p._id);
    li.innerHTML = `
      <b>${p.title}</b>
      <div>Precio: $${p.price}</div>
      <div>Categoría: ${p.category}</div>
      <div>Stock: ${p.stock}</div>
      <small>ID: ${p._id} · Code: ${p.code}</small>
    `;
    ul.appendChild(li);
  });
}

// 📡 Escuchar actualizaciones desde el servidor
socket.on("products:updated", (products) => {
  renderProducts(products);
});

// 🟢 Crear producto (con socket.emit)
const formCreate = document.getElementById("formCreate");
if (formCreate) {
  formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(formCreate);
    const body = {
      title: fd.get("title"),
      description: fd.get("description"),
      code: fd.get("code"),
      price: Number(fd.get("price")),
      stock: Number(fd.get("stock")),
      category: fd.get("category"),
      thumbnails: (fd.get("thumbnails") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      status: fd.get("status") === "on"
    };

    socket.emit("addProduct", body);
    document.getElementById("createMsg").textContent = "✅ Producto creado en tiempo real";
    formCreate.reset();
  });
}

// 🔴 Eliminar producto (con socket.emit)
const formDelete = document.getElementById("formDelete");
if (formDelete) {
  formDelete.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(formDelete);
    const pid = fd.get("pid");

    socket.emit("deleteProduct", pid);
    document.getElementById("deleteMsg").textContent = "❌ Producto eliminado en tiempo real";
    formDelete.reset();
  });
}



