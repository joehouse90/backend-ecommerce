// Cliente Socket.IO
const socket = io();

// 🔄 Función para renderizar la lista en el DOM
function renderProducts(list) {
  const ul = document.getElementById("productsList");
  if (!ul) return;

  ul.innerHTML = "";
  list.forEach((p) => {
    const li = document.createElement("li");
    li.className = "card";
    li.setAttribute("data-id", p.id);
    li.innerHTML = `
      <b>${p.title}</b>
      <div>Precio: $${p.price}</div>
      <div>Categoría: ${p.category}</div>
      <div>Stock: ${p.stock}</div>
      <small>ID: ${p.id} · Code: ${p.code}</small>
    `;
    ul.appendChild(li);
  });
}

// 📡 Escuchar actualizaciones desde el servidor
socket.on("products:updated", (products) => {
  renderProducts(products);
});

// 🟢 Manejo del formulario CREAR
const formCreate = document.getElementById("formCreate");
if (formCreate) {
  formCreate.addEventListener("submit", async (e) => {
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

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      document.getElementById("createMsg").textContent = data.message || "Producto creado!";
      formCreate.reset();
    } catch (err) {
      console.error("Error creando producto:", err);
    }
  });
}

// 🔴 Manejo del formulario ELIMINAR
const formDelete = document.getElementById("formDelete");
if (formDelete) {
  formDelete.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(formDelete);
    const pid = fd.get("pid");

    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE"
      });
      const data = await res.json();
      document.getElementById("deleteMsg").textContent = data.message || "Producto eliminado!";
      formDelete.reset();
    } catch (err) {
      console.error("Error eliminando producto:", err);
    }
  });
}


