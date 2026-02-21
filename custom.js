(function () {

  function colorContainerLabelOnly() {
    const span = document.querySelector('#utility_4739 #status span');
    if (!span) return;

    // Originele content 1x bewaren (zodat we niet stapelen/wrappen)
    if (!span.dataset.origText) {
      span.dataset.origText = span.textContent; // inclusief linebreaks als tekst
    }

    const raw = span.dataset.origText.trim();
    if (!raw) return;

    // Voorbeeld: "Donderdag 19 feb: Blauwe Container"
    // We kleuren alleen het stuk NA de eerste ':'
    const idx = raw.indexOf(':');
    const left = idx >= 0 ? raw.slice(0, idx + 1) : "";
    const right = idx >= 0 ? raw.slice(idx + 1).trim() : raw;

    const r = right.toLowerCase();

    let color = "";
    if (r.includes("blauwe")) color = "#007bff";
    else if (r.includes("oranje")) color = "#c46a1c";
    else if (r.includes("groene")) color = "#00b140";
    else if (r.includes("grijze")) color = "#515a62";

    // HTML opnieuw opbouwen: links wit, rechts gekleurd, rest (zoals <br>) behouden
    // We nemen alleen de eerste regel voor het label; eventuele extra regels blijven onderaan wit.
    const lines = raw.split(/\r?\n/);
    const firstLine = lines[0] || raw;
    const restLines = lines.slice(1).join("<br>");

    const idx2 = firstLine.indexOf(':');
    const left2 = idx2 >= 0 ? firstLine.slice(0, idx2 + 1) : "";
    const right2 = idx2 >= 0 ? firstLine.slice(idx2 + 1).trim() : firstLine;

    const coloredRight = color
      ? `<span style="color:${color}; font-weight:600;">${escapeHtml(right2)}</span>`
      : `<span>${escapeHtml(right2)}</span>`;

    const html =
      (left2 ? `${escapeHtml(left2)} ` : "") +
      coloredRight +
      (restLines ? `<br>${restLines}` : "") +
      "<br>";

    span.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // direct + ajax refresh
  colorContainerLabelOnly();
  setInterval(colorContainerLabelOnly, 1000);

})();
