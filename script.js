// CONFIGURAÇÃO — trocar pelos dados reais
const WHATSAPP = "5567996308422"; // Raul — (67) 99630-8422
const INSTAGRAM = "rk.st0re";     // sem o @ (com zero no "st0re")

const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const linkWhats = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const precoTexto = (p) => (p.preco == null ? "Consulte o preço" : brl(p.preco));
const msgProduto = (p) =>
  p.preco == null
    ? `Oi! Vi no site e quero o boné ${p.nome}. Qual o valor? Ainda tem?`
    : `Oi! Vi no site e quero o boné ${p.nome} (${brl(p.preco)}). Ainda tem?`;

function renderCatalogo(filtro) {
  const lista = filtro === "Todas" ? PRODUTOS : PRODUTOS.filter((p) => p.cor === filtro);
  document.getElementById("grade").innerHTML = lista
    .map((p) => `<article class="card">
        <div class="card-img">
          <img src="img/${p.foto}" alt="${p.nome}" loading="lazy">
          ${p.modelo ? `<img class="foto-modelo" src="img/${p.modelo}" alt="${p.nome} no modelo" loading="lazy">
          <button class="trocar" type="button">Ver no modelo</button>` : ""}
        </div>
        <span class="card-cor">${p.cor}</span>
        <h3>${p.nome}</h3>
        <p class="preco">${precoTexto(p)}</p>
        <a class="btn btn-sm" target="_blank" rel="noopener" href="${linkWhats(msgProduto(p))}">Quero esse</a>
      </article>`)
    .join("");
}

// No celular não tem "passar o mouse": o botão alterna entre boné e modelo.
document.getElementById("grade").addEventListener("click", (e) => {
  const b = e.target.closest(".trocar");
  if (!b) return;
  const card = b.closest(".card");
  const ativo = card.classList.toggle("no-modelo");
  b.textContent = ativo ? "Ver o boné" : "Ver no modelo";
});

function renderFiltros() {
  const cores = ["Todas", ...new Set(PRODUTOS.map((p) => p.cor))];
  const box = document.getElementById("filtros");
  box.innerHTML = cores
    .map((c, i) => `<button class="filtro${i === 0 ? " ativo" : ""}" data-cor="${c}">${c}</button>`)
    .join("");
  box.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    box.querySelectorAll(".filtro").forEach((x) => x.classList.toggle("ativo", x === b));
    renderCatalogo(b.dataset.cor);
  });
}

document.querySelectorAll("[data-whats]").forEach((a) => {
  a.href = linkWhats("Oi! Vim pelo site da RK Store e queria ver os bonés.");
});
document.querySelectorAll("[data-insta]").forEach((a) => {
  a.href = `https://instagram.com/${INSTAGRAM}`;
  if (a.dataset.insta === "texto") a.textContent = `@${INSTAGRAM}`;
});
document.getElementById("ano").textContent = new Date().getFullYear();

renderFiltros();
renderCatalogo("Todas");
