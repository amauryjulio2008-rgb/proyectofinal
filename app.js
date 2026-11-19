"use strict";

const COSTO_ENVIO = 15000;
const ENVIO_GRATIS_DESDE = 300000;
const CLAVE_STORAGE = "autoparts_carrito";

const FONDO_SVG =
  "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
  "<stop offset='0' stop-color='#fff4cc'/><stop offset='1' stop-color='#dfe6f3'/></linearGradient></defs>" +
  "<rect width='400' height='300' fill='url(#g)'/>" +
  "<ellipse cx='200' cy='262' rx='130' ry='12' fill='#14213d' opacity='.12'/>";

function crearSVG(dibujo) {
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>" + FONDO_SVG + dibujo + "</svg>";
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const IMAGEN_RESPALDO = crearSVG(
  "<circle cx='200' cy='140' r='55' fill='none' stroke='#14213d' stroke-width='16'/><circle cx='200' cy='140' r='12' fill='#14213d'/>"
);

function girar(n, plantilla, cx, cy) {
  return Array.from({ length: n }, (_, i) =>
    `<g transform='rotate(${(360 / n) * i} ${cx} ${cy})'>${plantilla}</g>`
  ).join("");
}

const dibujoFiltroAceite =
  "<rect x='138' y='96' width='124' height='128' rx='14' fill='#1d4ed8'/>" +
  "<rect x='138' y='96' width='124' height='34' rx='14' fill='#f5b700'/>" +
  "<rect x='130' y='88' width='140' height='14' rx='5' fill='#14213d'/>" +
  "<rect x='130' y='216' width='140' height='14' rx='5' fill='#14213d'/>" +
  "<rect x='156' y='142' width='88' height='56' rx='8' fill='#fff'/>" +
  "<text x='200' y='178' font-size='30' font-weight='700' text-anchor='middle' fill='#14213d' font-family='Arial,sans-serif'>OIL</text>" +
  "<path d='M170 130v-4M200 130v-4M230 130v-4' stroke='#14213d' stroke-width='3'/>";

function bujia(x) {
  return `<g transform='translate(${x} 70)'>` +
    "<rect x='-4' y='-12' width='8' height='14' fill='#6b7280'/>" +
    "<rect x='-11' y='0' width='22' height='62' rx='6' fill='#fff' stroke='#14213d' stroke-width='2'/>" +
    "<path d='M-11 18h22M-11 30h22' stroke='#cbd5e1' stroke-width='2'/>" +
    "<rect x='-16' y='62' width='32' height='22' rx='3' fill='#9ca3af' stroke='#4b5563' stroke-width='2'/>" +
    "<rect x='-9' y='84' width='18' height='36' fill='#6b7280'/>" +
    "<path d='M-9 92h18M-9 100h18M-9 108h18' stroke='#374151' stroke-width='2'/>" +
    "<rect x='-2.5' y='120' width='5' height='14' fill='#f5b700'/></g>";
}
const dibujoBujias = bujia(95) + bujia(165) + bujia(235) + bujia(305) +
  "<text x='200' y='238' font-size='16' font-weight='700' text-anchor='middle' fill='#14213d' font-family='Arial,sans-serif'>IRIDIUM x4</text>";

const dibujoBateria =
  "<rect x='85' y='112' width='230' height='122' rx='10' fill='#14213d'/>" +
  "<rect x='85' y='100' width='230' height='20' rx='6' fill='#0b1426'/>" +
  "<rect x='112' y='80' width='30' height='20' rx='3' fill='#c62828'/>" +
  "<rect x='258' y='80' width='30' height='20' rx='3' fill='#111'/>" +
  "<text x='127' y='96' font-size='16' font-weight='700' text-anchor='middle' fill='#fff' font-family='Arial,sans-serif'>+</text>" +
  "<text x='273' y='96' font-size='18' font-weight='700' text-anchor='middle' fill='#fff' font-family='Arial,sans-serif'>-</text>" +
  "<rect x='125' y='148' width='150' height='56' rx='8' fill='#f5b700'/>" +
  "<text x='200' y='183' font-size='26' font-weight='700' text-anchor='middle' fill='#14213d' font-family='Arial,sans-serif'>12V 60Ah</text>";

const dibujoPastillas =
  "<path d='M80 125q120-30 240 0v26H80z' fill='#9ca3af' stroke='#4b5563' stroke-width='3'/>" +
  "<path d='M80 151h240v18q-120 30-240 0z' fill='#374151'/>" +
  "<path d='M80 169q120 30 240 0v22q-120 30-240 0z' fill='#4b5563'/>" +
  "<path d='M199 150v58M140 150v52M260 150v52' stroke='#cbd5e1' stroke-width='6'/>" +
  "<circle cx='105' cy='138' r='7' fill='#e5e7eb'/><circle cx='295' cy='138' r='7' fill='#e5e7eb'/>" +
  "<rect x='120' y='96' width='160' height='10' rx='4' fill='#f5b700'/>";

const dibujoDisco =
  "<circle cx='200' cy='150' r='98' fill='#9ca3af' stroke='#4b5563' stroke-width='4'/>" +
  "<circle cx='200' cy='150' r='84' fill='#b6bcc6'/>" +
  girar(18, "<rect x='196' y='72' width='8' height='30' rx='4' fill='#4b5563'/>", 200, 150) +
  "<circle cx='200' cy='150' r='44' fill='#6b7280' stroke='#374151' stroke-width='3'/>" +
  girar(5, "<circle cx='200' cy='124' r='7' fill='#e5e7eb' stroke='#374151' stroke-width='2'/>", 200, 150) +
  "<circle cx='200' cy='150' r='12' fill='#374151'/>";

function espiras() {
  let s = "";
  for (let y = 72; y <= 196; y += 17) {
    s += `<path d='M156 ${y + 12}L244 ${y}' stroke='#c62828' stroke-width='8' stroke-linecap='round'/>`;
  }
  return s;
}
const dibujoAmortiguador =
  "<rect x='172' y='34' width='56' height='18' rx='6' fill='#374151'/>" +
  "<rect x='195' y='52' width='10' height='70' fill='#d1d5db'/>" +
  "<rect x='178' y='118' width='44' height='112' rx='8' fill='#14213d'/>" +
  "<rect x='178' y='150' width='44' height='16' fill='#f5b700'/>" +
  "<circle cx='200' cy='242' r='13' fill='none' stroke='#374151' stroke-width='8'/>" +
  espiras();

const dibujoAceite =
  "<path d='M268 112H292Q314 112 314 134V190Q314 212 292 212H268' fill='none' stroke='#e0a500' stroke-width='14'/>" +
  "<rect x='125' y='92' width='150' height='148' rx='18' fill='#f5b700'/>" +
  "<rect x='162' y='66' width='46' height='28' rx='5' fill='#14213d'/>" +
  "<rect x='142' y='122' width='116' height='92' rx='8' fill='#fff'/>" +
  "<path d='M200 128q-10 14-10 20a10 10 0 0 0 20 0q0-6-10-20z' fill='#c62828'/>" +
  "<text x='200' y='178' font-size='30' font-weight='700' text-anchor='middle' fill='#14213d' font-family='Arial,sans-serif'>5W-30</text>" +
  "<text x='200' y='196' font-size='12' text-anchor='middle' fill='#4b5563' font-family='Arial,sans-serif'>SINTETICO</text>" +
  "<text x='200' y='209' font-size='12' font-weight='700' text-anchor='middle' fill='#14213d' font-family='Arial,sans-serif'>4 LITROS</text>";

function nervaduras(x, y, w, h) {
  let s = "";
  for (let i = 18; i < h - 10; i += 14) {
    s += `<path d='M${x + 12} ${y + i}h${w - 24}' stroke='#6b7280' stroke-width='3'/>`;
  }
  return s;
}
const dibujoTapetes =
  "<rect x='96' y='54' width='116' height='180' rx='16' fill='#1f2937'/>" + nervaduras(96, 54, 116, 180) +
  "<rect x='104' y='62' width='100' height='164' rx='12' fill='none' stroke='#f5b700' stroke-width='2' stroke-dasharray='6 4'/>" +
  "<rect x='188' y='84' width='116' height='160' rx='16' fill='#374151'/>" + nervaduras(188, 84, 116, 160) +
  "<rect x='196' y='92' width='100' height='144' rx='12' fill='none' stroke='#f5b700' stroke-width='2' stroke-dasharray='6 4'/>";

const dibujoCamara =
  "<rect x='70' y='116' width='110' height='74' rx='16' fill='#1f2937'/>" +
  "<circle cx='125' cy='153' r='28' fill='#111' stroke='#9ca3af' stroke-width='4'/>" +
  "<circle cx='125' cy='153' r='15' fill='#1d4ed8'/><circle cx='119' cy='147' r='4' fill='#fff'/>" +
  "<circle cx='85' cy='128' r='4' fill='#f5b700'/><circle cx='165' cy='128' r='4' fill='#f5b700'/>" +
  "<rect x='108' y='190' width='34' height='26' rx='4' fill='#6b7280'/>" +
  "<rect x='215' y='84' width='150' height='108' rx='10' fill='#14213d'/>" +
  "<rect x='224' y='92' width='132' height='92' rx='6' fill='#0f172a'/>" +
  "<path d='M240 180L275 104M340 180L305 104' stroke='#22c55e' stroke-width='4'/>" +
  "<path d='M248 160h104' stroke='#c62828' stroke-width='3'/><path d='M258 138h84' stroke='#f5b700' stroke-width='3'/>" +
  "<rect x='275' y='192' width='40' height='14' fill='#6b7280'/><rect x='255' y='206' width='80' height='8' rx='4' fill='#374151'/>";

function bombilloLED(x) {
  return `<g transform='translate(${x} 56)'>` +
    "<circle cx='0' cy='118' r='40' fill='#fde68a' opacity='.55'/>" +
    "<rect x='-20' y='0' width='40' height='22' rx='4' fill='#374151'/>" +
    "<rect x='-26' y='22' width='52' height='56' rx='5' fill='#9ca3af' stroke='#4b5563' stroke-width='2'/>" +
    "<path d='M-26 36h52M-26 50h52M-26 64h52' stroke='#4b5563' stroke-width='3'/>" +
    "<rect x='-16' y='78' width='32' height='52' rx='6' fill='#f9fafb' stroke='#cbd5e1' stroke-width='2'/>" +
    "<rect x='-8' y='88' width='16' height='32' rx='3' fill='#fde047'/></g>";
}
const dibujoLED = bombilloLED(125) + bombilloLED(275) +
  "<text x='200' y='238' font-size='18' font-weight='700' text-anchor='middle' fill='#14213d' font-family='Arial,sans-serif'>LED H7  6000K</text>";

const dibujoArranque =
  "<path d='M270 150C320 150 320 100 338 100' fill='none' stroke='#c62828' stroke-width='7'/>" +
  "<path d='M270 184C320 184 320 226 338 226' fill='none' stroke='#111' stroke-width='7'/>" +
  "<rect x='334' y='86' width='36' height='26' rx='4' fill='#c62828'/><path d='M340 112l8 12 8-12' fill='#9ca3af'/>" +
  "<rect x='334' y='212' width='36' height='26' rx='4' fill='#111'/><path d='M340 238l8-12 8 12' fill='#9ca3af'/>" +
  "<rect x='70' y='96' width='200' height='122' rx='18' fill='#14213d'/>" +
  "<rect x='70' y='96' width='200' height='28' rx='14' fill='#f5b700'/>" +
  "<path d='M176 138l-18 32h16l-8 30 30-38h-16l10-24z' fill='#f5b700'/>" +
  "<circle cx='92' cy='150' r='5' fill='#22c55e'/><circle cx='92' cy='166' r='5' fill='#22c55e'/><circle cx='92' cy='182' r='5' fill='#6b7280'/>" +
  "<text x='235' y='170' font-size='22' font-weight='700' text-anchor='middle' fill='#fff' font-family='Arial,sans-serif'>12V</text>";

const dibujoLlanta =
  "<circle cx='200' cy='150' r='102' fill='#111827'/>" +
  girar(28, "<rect x='194' y='48' width='12' height='14' rx='3' fill='#374151'/>", 200, 150) +
  "<circle cx='200' cy='150' r='80' fill='#1f2937' stroke='#374151' stroke-width='3'/>" +
  "<circle cx='200' cy='150' r='54' fill='#d1d5db' stroke='#9ca3af' stroke-width='4'/>" +
  girar(5, "<path d='M192 142L188 104h24l-4 38z' fill='#6b7280'/>", 200, 150) +
  "<circle cx='200' cy='150' r='13' fill='#374151'/><circle cx='200' cy='150' r='5' fill='#f5b700'/>";

const productos = [
  { id: 1,  nombre: "Filtro de aceite", descripcion: "Filtro de alta retención compatible con motores 1.4 a 2.0 L.", precio: 28000, categoria: "Motor", imagen: crearSVG(dibujoFiltroAceite) },
  { id: 2,  nombre: "Bujías iridium (juego x4)", descripcion: "Mejor encendido y menor consumo de combustible.", precio: 96000, categoria: "Motor", imagen: crearSVG(dibujoBujias) },
  { id: 3,  nombre: "Batería 12V 60Ah", descripcion: "Batería libre de mantenimiento con 18 meses de garantía.", precio: 385000, categoria: "Eléctrico", imagen: crearSVG(dibujoBateria) },
  { id: 4,  nombre: "Pastillas de freno delanteras", descripcion: "Material cerámico de baja fricción y larga duración.", precio: 85000, categoria: "Frenos", imagen: crearSVG(dibujoPastillas) },
  { id: 5,  nombre: "Disco de freno ventilado", descripcion: "Disco de acero ventilado para mayor disipación de calor.", precio: 142000, categoria: "Frenos", imagen: crearSVG(dibujoDisco) },
  { id: 6,  nombre: "Amortiguador delantero", descripcion: "Amortiguador de gas para una conducción estable y cómoda.", precio: 210000, categoria: "Suspensión", imagen: crearSVG(dibujoAmortiguador) },
  { id: 7,  nombre: "Aceite sintético 5W-30 (4 L)", descripcion: "Protección superior del motor en climas cálidos.", precio: 118000, categoria: "Lubricantes", imagen: crearSVG(dibujoAceite) },
  { id: 8,  nombre: "Tapetes universales de caucho", descripcion: "Juego de 4 tapetes antideslizantes y lavables.", precio: 65000, categoria: "Accesorios", imagen: crearSVG(dibujoTapetes) },
  { id: 9,  nombre: "Cámara de reversa HD", descripcion: "Cámara con visión nocturna y guías de estacionamiento.", precio: 89000, categoria: "Accesorios", imagen: crearSVG(dibujoCamara) },
  { id: 10, nombre: "Kit de luces LED H7", descripcion: "Par de bombillos LED de 6000K, instalación plug & play.", precio: 120000, categoria: "Eléctrico", imagen: crearSVG(dibujoLED) },
  { id: 11, nombre: "Cargador portátil de arranque", descripcion: "Arrancador de emergencia 12V con linterna y puerto USB.", precio: 175000, categoria: "Accesorios", imagen: crearSVG(dibujoArranque) },
  { id: 12, nombre: "Llanta 185/65 R15", descripcion: "Llanta radial con excelente agarre en pavimento mojado.", precio: 295000, categoria: "Llantas", imagen: crearSVG(dibujoLlanta) }
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
  try { localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito)); } catch (e) {}
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