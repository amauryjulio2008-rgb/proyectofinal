"use strict";


const COSTO_ENVIO = 15000;            
const ENVIO_GRATIS_DESDE = 300000;    
const CLAVE_STORAGE = "autoparts_carrito";


const IMAGEN_RESPALDO = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='#e5e7eb'/>" +
  "<circle cx='200' cy='150' r='50' fill='none' stroke='#14213d' stroke-width='14'/>" +
  "<circle cx='200' cy='150' r='12' fill='#14213d'/></svg>");

const u = (id) => `https://images.unsplash.com/${id}?w=500&q=70`;


const productos = [
  { id: 1,  nombre: "Filtro de aceite", descripcion: "Filtro de alta retención compatible con motores 1.4 a 2.0 L.", precio: 28000, categoria: "Motor", imagen: u("photo-1486262715619-67b85e0b08d3") },
  { id: 2,  nombre: "Bujías iridium (juego x4)", descripcion: "Mejor encendido y menor consumo de combustible.", precio: 96000, categoria: "Motor", imagen: u("photo-1530046339160-ce3e530c7d2f") },
  { id: 3,  nombre: "Batería 12V 60Ah", descripcion: "Batería libre de mantenimiento con 18 meses de garantía.", precio: 385000, categoria: "Eléctrico", imagen: u("photo-1620714223084-8fcacc6dfd8d") },
  { id: 4,  nombre: "Pastillas de freno delanteras", descripcion: "Material cerámico de baja fricción y larga duración.", precio: 85000, categoria: "Frenos", imagen: u("photo-1600861194942-f883de0dfe96") },
  { id: 5,  nombre: "Disco de freno ventilado", descripcion: "Disco de acero ventilado para mayor disipación de calor.", precio: 142000, categoria: "Frenos", imagen: u("photo-1625047509248-ec889cbff17f") },
  { id: 6,  nombre: "Amortiguador delantero", descripcion: "Amortiguador de gas para una conducción estable y cómoda.", precio: 210000, categoria: "Suspensión", imagen: u("photo-1503376780353-7e6692767b70") },
  { id: 7,  nombre: "Aceite sintético 5W-30 (4 L)", descripcion: "Protección superior del motor en climas cálidos.", precio: 118000, categoria: "Lubricantes", imagen: u("photo-1635784063388-1ff609aa8d5e") },
  { id: 8,  nombre: "Tapetes universales de caucho", descripcion: "Juego de 4 tapetes antideslizantes y lavables.", precio: 65000, categoria: "Accesorios", imagen: u("photo-1492144534655-ae79c964c9d7") },
  { id: 9,  nombre: "Cámara de reversa HD", descripcion: "Cámara con visión nocturna y guías de estacionamiento.", precio: 89000, categoria: "Accesorios", imagen: u("photo-1494976388531-d1058494cdd8") },
  { id: 10, nombre: "Kit de luces LED H7", descripcion: "Par de bombillos LED de 6000K, instalación plug & play.", precio: 120000, categoria: "Eléctrico", imagen: u("photo-1511919884226-fd3cad34687c") },
  { id: 11, nombre: "Cargador portátil de arranque", descripcion: "Arrancador de emergencia 12V con linterna y puerto USB.", precio: 175000, categoria: "Accesorios", imagen: u("photo-1549317661-bd32c8ce0db2") },
  { id: 12, nombre: "Llanta 185/65 R15", descripcion: "Llanta radial con excelente agarre en pavimento mojado.", precio: 295000, categoria: "Llantas", imagen: u("photo-1578844251758-2f71da64c96f") }
];


let carrito = cargarCarrito();


const $ = (id) => document.getElementById(id);


function formatearCOP(valor) {
  return "$" + Math.round(valor).toLocaleString("es-CO") + " COP";
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
  try { localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito)); } catch (e) { /* almacenamiento no disponible */ }
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
  img.addEventListener("error", () => { img.src = IMAGEN_RESPALDO; }, { once: true }); // fallback
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
    carrito.push({ id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen, cantidad: 1 });
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
    fila.append(crearImagen(it.imagen, it.nombre), info, derecha);
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

  vaciarCarrito(true);   // limpia estado y localStorage
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
