"use strict";

const COSTO_ENVIO = 15000;
const ENVIO_GRATIS_DESDE = 300000;
const CLAVE_STORAGE = "autoparts_carrito_v2";

const IMAGEN_RESPALDO = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#e5e7eb'/>" +
  "<circle cx='200' cy='140' r='55' fill='none' stroke='#14213d' stroke-width='16'/><circle cx='200' cy='140' r='12' fill='#14213d'/></svg>");

const productos = [
  { id: 1,  nombre: "Bomba de levante C-101 (con kit neumático)", descripcion: "Bomba hidráulica de levante con kit neumático incluido para volquetas.", precio: 1850000, categoria: "Bombas hidráulicas", imagen: "img/01-bomba-c101.jpg" },
  { id: 2,  nombre: "Bomba de levante C-102 (sin kit neumático)", descripcion: "Bomba hidráulica de levante para volquetas, sin kit neumático.", precio: 1450000, categoria: "Bombas hidráulicas", imagen: "img/02-bomba-c102.jpg" },
  { id: 3,  nombre: "Kit neumático para bomba de levante", descripcion: "Cuerpo, émbolo, sellos y tornillería para el accionamiento neumático.", precio: 520000, categoria: "Bombas hidráulicas", imagen: "img/06-kit-neumatico.jpg" },
  { id: 4,  nombre: "Aceite hidráulico Mobil AW 68", descripcion: "Aceite hidráulico antidesgaste en presentación de un cuarto (0,946 L).", precio: 38000, categoria: "Lubricantes", imagen: "img/03-mobil-aw68.jpg" },
  { id: 5,  nombre: "Aceite hidráulico OMAX 68", descripcion: "Aceite hidráulico SAE 68 para sistemas de levante y maquinaria.", precio: 78000, categoria: "Lubricantes", imagen: "img/05-omax-hidraulico68.jpg" },
  { id: 6,  nombre: "Valvulina OMAX 90", descripcion: "Lubricante SAE 90 para cajas y diferenciales, presentación de 946 mL.", precio: 32000, categoria: "Lubricantes", imagen: "img/04-valvulina-omax90.jpg" },
  { id: 7,  nombre: "Aceite de motor OMAX 15W40", descripcion: "Aceite API CI-4 para trabajo pesado, galón de 3,8 L.", precio: 98000, categoria: "Lubricantes", imagen: "img/16-omax-15w40.jpg" },
  { id: 8,  nombre: "Filtro de aceite Caterpillar / Ford / Freightliner / International", descripcion: "Filtro de aceite roscado Premium Filters OLP-098, rosca M18 x 1.5.", precio: 42000, categoria: "Filtros", imagen: "img/07-filtro-aceite.jpg" },
  { id: 9,  nombre: "Filtro de aire International", descripcion: "Elemento filtrante cilíndrico perforado para motores International.", precio: 68000, categoria: "Filtros", imagen: "img/08-filtro-aire-international.jpg" },
  { id: 10, nombre: "Filtro de aire Kenworth", descripcion: "Filtro de aire de papel plisado con malla metálica para Kenworth.", precio: 75000, categoria: "Filtros", imagen: "img/09-filtro-aire-kenworth.jpg" },
  { id: 11, nombre: "Silicona gris Loctite SI 5699", descripcion: "Formador de juntas RTV de alto desempeño, 70 mL, resistente al aceite.", precio: 48000, categoria: "Selladores y adhesivos", imagen: "img/10-loctite-si5699.jpg" },
  { id: 12, nombre: "Silicona neutra gris HT Würth", descripcion: "Silicona neutra de alta temperatura para sellado, tubo de 60 g.", precio: 36000, categoria: "Selladores y adhesivos", imagen: "img/11-wurth-silicona.jpg" },
  { id: 13, nombre: "Pegante instantáneo Würth Bonder", descripcion: "Adhesivo instantáneo de uso profesional, tubo de 2 g.", precio: 14000, categoria: "Selladores y adhesivos", imagen: "img/12-wurth-bonder.jpg" },
  { id: 14, nombre: "Adhesivo epóxico Sintesolda", descripcion: "Epóxico transparente de dos componentes que cura en 10 minutos, 14 g.", precio: 12000, categoria: "Selladores y adhesivos", imagen: "img/13-sintesolda.jpg" },
  { id: 15, nombre: "Desoxidante y lubricante Würth Rost Off", descripcion: "Aflojatodo anticorrosivo en aerosol de 300 mL para tornillos oxidados.", precio: 29000, categoria: "Mantenimiento", imagen: "img/14-rost-off.jpg" },
  { id: 16, nombre: "Limpiador de sistema de frenos Ker", descripcion: "Limpiador en aerosol de 450 mL que seca rápido y no requiere desmontar.", precio: 26000, categoria: "Mantenimiento", imagen: "img/15-limpiador-frenos-ker.jpg" }
];

let carrito = cargarCarrito();

const $ = (id) => document.getElementById(id);

function formatearCOP(valor) {
  return "$" + Math.round(valor).toLocaleString("es-CO") + " COP";
}

function imagenDeProducto(id) {
  const p = productos.find((x) => x.id === id);
  return p ? p.imagen : IMAGEN_RESPALDO;
}

function calcularSubtotalProducto(item) { return item.precio * item.cantidad; }
function calcularSubtotalGeneral(items) { return items.reduce((suma, it) => suma + calcularSubtotalProducto(it), 0); }
function calcularEnvio(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
}
function calcularTotal(subtotal, envio) { return subtotal + envio; }
function contarUnidades(items) { return items.reduce((suma, it) => suma + it.cantidad, 0); }

function cargarCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    return Array.isArray(datos) ? datos.filter((d) => d && d.id && d.cantidad > 0) : [];
  } catch (e) { return []; }
}
function guardarCarrito() {
  try { localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito)); } catch (e) {  }
}

function mostrarToast(mensaje, tipo = "info") {
  const toast = document.createElement("div");
  toast.className = "toast " + tipo;
  toast.textContent = mensaje;
  $("toastZona").appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function crearImagen(src, alt) {
  const img = document.createElement("img");
  img.src = src; img.alt = alt; img.loading = "lazy";
  img.addEventListener("error", () => { img.src = IMAGEN_RESPALDO; }, { once: true });
  return img;
}

function renderizarCatalogo() {
  const texto = $("buscador").value.trim().toLowerCase();
  const cat = $("filtroCategoria").value;
  const lista = productos.filter((p) =>
    (cat === "Todas" || p.categoria === cat) &&
    (p.nombre + " " + p.descripcion).toLowerCase().includes(texto));
  const grid = $("gridProductos");
  grid.replaceChildren();
  if (!lista.length) {
    const vacio = document.createElement("p");
    vacio.className = "sin-resultados";
    vacio.textContent = "No se encontraron productos.";
    grid.appendChild(vacio);
    return;
  }
  lista.forEach((p) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    const cuerpo = document.createElement("div");
    cuerpo.className = "tarjeta-cuerpo";
    cuerpo.innerHTML = `<span class="categoria"></span><h3></h3><p class="desc"></p><p class="precio"></p>`;
    cuerpo.querySelector(".categoria").textContent = p.categoria;
    cuerpo.querySelector("h3").textContent = p.nombre;
    cuerpo.querySelector(".desc").textContent = p.descripcion;
    cuerpo.querySelector(".precio").textContent = formatearCOP(p.precio);
    const boton = document.createElement("button");
    boton.className = "btn-primario";
    boton.textContent = "Agregar al carrito";
    boton.addEventListener("click", () => agregarAlCarrito(p.id));
    cuerpo.appendChild(boton);
    tarjeta.append(crearImagen(p.imagen, p.nombre), cuerpo);
    grid.appendChild(tarjeta);
  });
}

function cargarCategorias() {
  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];
  $("filtroCategoria").innerHTML = categorias.map((c) => `<option value="${c}">${c === "Todas" ? "Todas las categorías" : c}</option>`).join("");
}

function agregarAlCarrito(id) {
  const existente = carrito.find((it) => it.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    const p = productos.find((x) => x.id === id);
    carrito.push({ id: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1 });
  }
  guardarCarrito(); renderizarCarrito();
  mostrarToast("Producto agregado al carrito", "ok");
}

function actualizarCantidad(id, nuevaCantidad) {
  if (nuevaCantidad < 1) { eliminarProducto(id); return; }
  const item = carrito.find((it) => it.id === id);
  if (item) item.cantidad = Math.min(nuevaCantidad, 99);
  guardarCarrito(); renderizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter((it) => it.id !== id);
  guardarCarrito(); renderizarCarrito();
  mostrarToast("Producto eliminado", "info");
}

function vaciarCarrito(silencioso = false) {
  carrito = [];
  guardarCarrito(); renderizarCarrito();
  if (!silencioso) mostrarToast("Carrito vaciado", "info");
}

function renderizarCarrito() {
  const lista = $("listaCarrito");
  lista.replaceChildren();
  carrito.forEach((it) => {
    const fila = document.createElement("li");
    fila.className = "item";
    const info = document.createElement("div");
    info.innerHTML = `<p class="item-nombre"></p><p class="item-precio"></p>
      <div class="cantidad"><button aria-label="Disminuir">−</button><span></span><button aria-label="Aumentar">+</button></div>`;
    info.querySelector(".item-nombre").textContent = it.nombre;
    info.querySelector(".item-precio").textContent = formatearCOP(it.precio) + " c/u";
    info.querySelector("span").textContent = it.cantidad;
    const [menos, mas] = info.querySelectorAll("button");
    menos.addEventListener("click", () => actualizarCantidad(it.id, it.cantidad - 1));
    mas.addEventListener("click", () => actualizarCantidad(it.id, it.cantidad + 1));
    const derecha = document.createElement("div");
    const borrar = document.createElement("button");
    borrar.className = "btn-eliminar"; borrar.textContent = "🗑"; borrar.setAttribute("aria-label", "Eliminar " + it.nombre);
    borrar.addEventListener("click", () => eliminarProducto(it.id));
    const sub = document.createElement("p");
    sub.className = "item-subtotal"; sub.textContent = formatearCOP(calcularSubtotalProducto(it));
    derecha.append(borrar, sub);
    fila.append(crearImagen(imagenDeProducto(it.id), it.nombre), info, derecha);
    lista.appendChild(fila);
  });

  const unidades = contarUnidades(carrito);
  const subtotal = calcularSubtotalGeneral(carrito);
  const envio = calcularEnvio(subtotal);
  const total = calcularTotal(subtotal, envio);

  $("badgeCarrito").textContent = unidades;
  $("totalUnidades").textContent = unidades;
  $("subtotal").textContent = formatearCOP(subtotal);
  $("envio").textContent = formatearCOP(envio);
  $("total").textContent = formatearCOP(total);
  $("mensajeVacio").hidden = unidades > 0;
  $("btnVaciar").disabled = unidades === 0;
  $("btnFinalizar").disabled = unidades === 0;
  $("resumenSeccion").textContent = unidades
    ? `Tienes ${unidades} unidad(es). Total a pagar: ${formatearCOP(total)}.`
    : "Tu carrito está vacío. Explora el catálogo y agrega productos.";
  $("notaEnvio").textContent = subtotal === 0 ? "" :
    envio === 0 ? "¡Envío gratis aplicado!" : `Envío gratis desde ${formatearCOP(ENVIO_GRATIS_DESDE)}.`;
}

function abrirDrawer() {
  $("drawer").classList.add("abierto"); $("drawer").setAttribute("aria-hidden", "false");
  $("overlay").hidden = false;
}
function cerrarDrawer() {
  $("drawer").classList.remove("abierto"); $("drawer").setAttribute("aria-hidden", "true");
  $("overlay").hidden = true;
}

const reglas = {
  nombre:    { err: "errNombre",    ok: (v) => v.length >= 3, msg: "Ingresa tu nombre completo (mínimo 3 caracteres)." },
  correo:    { err: "errCorreo",    ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), msg: "Ingresa un correo válido, ej: nombre@correo.com." },
  telefono:  { err: "errTelefono",  ok: (v) => /^\d{7,10}$/.test(v.replace(/[\s-]/g, "")), msg: "El teléfono debe tener entre 7 y 10 dígitos." },
  direccion: { err: "errDireccion", ok: (v) => v.length >= 5, msg: "Ingresa una dirección de entrega válida." }
};

function validarFormulario() {
  let valido = true;
  for (const campo in reglas) {
    const input = $(campo);
    const correcto = reglas[campo].ok(input.value.trim());
    input.classList.toggle("invalido", !correcto);
    $(reglas[campo].err).textContent = correcto ? "" : reglas[campo].msg;
    if (!correcto) valido = false;
  }
  return valido;
}

function limpiarFormulario() {
  $("formCheckout").reset();
  document.querySelectorAll(".error").forEach((e) => { e.textContent = ""; });
  document.querySelectorAll("#formCheckout input").forEach((i) => i.classList.remove("invalido"));
}

function finalizarCompra(evento) {
  evento.preventDefault();
  if (carrito.length === 0) { mostrarToast("Tu carrito está vacío.", "error"); return; }
  if (!validarFormulario()) { mostrarToast("Revisa los campos marcados en rojo.", "error"); return; }

  const subtotal = calcularSubtotalGeneral(carrito);
  const total = calcularTotal(subtotal, calcularEnvio(subtotal));
  $("compNombre").textContent = $("nombre").value.trim();
  $("compDireccion").textContent = $("direccion").value.trim();
  $("compTotal").textContent = formatearCOP(total);
  $("compDetalle").innerHTML = "";
  carrito.forEach((it) => {
    const li = document.createElement("li");
    li.textContent = `${it.cantidad} × ${it.nombre} — ${formatearCOP(calcularSubtotalProducto(it))}`;
    $("compDetalle").appendChild(li);
  });

  vaciarCarrito(true);
  limpiarFormulario();
  cerrarDrawer();
  $("modalComprobante").hidden = false;
}

function iniciar() {
  cargarCategorias();
  renderizarCatalogo();
  renderizarCarrito();

  $("buscador").addEventListener("input", renderizarCatalogo);
  $("filtroCategoria").addEventListener("change", renderizarCatalogo);
  $("btnCarrito").addEventListener("click", abrirDrawer);
  $("btnAbrirDesdeSeccion").addEventListener("click", abrirDrawer);
  $("cerrarDrawer").addEventListener("click", cerrarDrawer);
  $("overlay").addEventListener("click", cerrarDrawer);
  $("btnVaciar").addEventListener("click", () => vaciarCarrito());
  $("formCheckout").addEventListener("submit", finalizarCompra);
  $("cerrarComprobante").addEventListener("click", () => { $("modalComprobante").hidden = true; });
  $("btnMenu").addEventListener("click", () => {
    const abierto = $("menu").classList.toggle("abierto");
    $("btnMenu").setAttribute("aria-expanded", abierto);
  });
  $("menu").addEventListener("click", () => $("menu").classList.remove("abierto"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { cerrarDrawer(); $("modalComprobante").hidden = true; }
  });
}

document.addEventListener("DOMContentLoaded", iniciar);
