

(function () {
  const API = "/api/knihy";
  const telo = document.getElementById("telo");
  const info = document.getElementById("info");
  const form = document.getElementById("novaKniha");
  if (!telo || !form) return;

  let casovac;

  function oznam(text, jeChyba) {
    info.textContent = text;
    info.className = "info " + (jeChyba ? "zle" : "dobre");
    clearTimeout(casovac);
    casovac = setTimeout(() => (info.textContent = ""), 3000);
  }

  function textBunka(popis, hodnota, trieda) {
    const td = document.createElement("td");
    td.dataset.label = popis;
    if (trieda) td.className = trieda;
    td.textContent = hodnota;
    return td;
  }
  function bunkaSInputom(popis, trieda, hodnota, typ, krok) {
    const td = document.createElement("td");
    td.dataset.label = popis;
    const input = document.createElement("input");
    input.type = typ;
    input.className = trieda;
    input.value = hodnota;
    input.setAttribute("aria-label", popis);
    if (krok) input.step = krok;
    td.appendChild(input);
    return td;
  }

  function nacitajKnihy() {
    fetch(API)
      .then(r => r.json())
      .then(knihy => {
        document.getElementById("pocet").textContent = knihy.length;
        telo.innerHTML = "";

        if (knihy.length === 0) {
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.className = "empty";
          td.colSpan = 6;
          td.textContent = "Zatiaľ tu nie sú žiadne knihy.";
          tr.appendChild(td);
          telo.appendChild(tr);
          return;
        }

        knihy.forEach(kniha => {
          const tr = document.createElement("tr");

          tr.appendChild(textBunka("ID", kniha.id, "id"));
          tr.appendChild(bunkaSInputom("Názov", "e-nazov", kniha.nazov, "text"));
          tr.appendChild(bunkaSInputom("Autor", "e-autor", kniha.autor, "text"));
          tr.appendChild(bunkaSInputom("Rok", "e-rok", kniha.rok, "number"));
          tr.appendChild(bunkaSInputom("Cena (€)", "e-cena", kniha.cena, "number", "0.01"));

      
          const akcia = document.createElement("td");
          akcia.className = "akcie";
          akcia.dataset.id = kniha.id;
          akcia.innerHTML =
            '<div class="btns">' +
            '<button class="ulozit btn-save">Uložiť</button>' +
            '<button class="odstranit btn-del">Odstrániť</button>' +
            '</div>';
          tr.appendChild(akcia);


          tr.addEventListener("input", () => tr.classList.add("dirty"));

          telo.appendChild(tr);
        });
      })
      .catch(() => oznam("Nepodarilo sa načítať knihy – je spustený server a MySQL?", true));
  }


  telo.addEventListener("click", e => {
    const bunka = e.target.closest(".akcie");
    if (!bunka) return;
    const id = bunka.dataset.id;
    const riadok = bunka.closest("tr");

    if (e.target.classList.contains("ulozit")) {
      const data = {
        nazov: riadok.querySelector(".e-nazov").value.trim(),
        autor: riadok.querySelector(".e-autor").value.trim(),
        rok: parseInt(riadok.querySelector(".e-rok").value),
        cena: Number(riadok.querySelector(".e-cena").value)
      };

      fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(r => r.text().then(t => oznam(t || "Kniha neexistuje", !r.ok)))
        .then(nacitajKnihy);
    }

    if (e.target.classList.contains("odstranit")) {
      if (!confirm("Odstrániť knihu s ID " + id + "?")) return;
      fetch(`${API}/${id}`, { method: "DELETE" })
        .then(r => r.text().then(t => oznam(t, !r.ok)))
        .then(nacitajKnihy);
    }
  });


  form.addEventListener("submit", e => {
    e.preventDefault();

    const kniha = {
      nazov: document.getElementById("nazov").value.trim(),
      autor: document.getElementById("autor").value.trim(),
      rok: parseInt(document.getElementById("rok").value),
      cena: Number(document.getElementById("cena").value)
    };

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kniha)
    })
      .then(r => r.text().then(t => {
        oznam(t, !r.ok);
        if (r.ok) {
          form.reset();
          document.getElementById("nazov").focus();
        }
      }))
      .then(nacitajKnihy);
  });

  nacitajKnihy();
})();