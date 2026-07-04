function generarFolioManual() {

    const rfcContribuyente = document.getElementById("rfcContribuyente").value;
    const rfcProveedor = document.getElementById("rfcProveedor").value;

    const añoActual = new Date().getFullYear();

    let ultimoAño = localStorage.getItem("anioFolio");
    let consecutivo = localStorage.getItem("consecutivoFolio");

    if (!consecutivo || ultimoAño != añoActual) {
        consecutivo = 1;
    } else {
        consecutivo = parseInt(consecutivo);
    }

    const consecutivoFormateado = String(consecutivo).padStart(5, "0");

    const folio = `DI-${rfcContribuyente}_${rfcProveedor}${consecutivoFormateado}${añoActual}`;

    localStorage.setItem("consecutivoFolio", consecutivo + 1);
    localStorage.setItem("anioFolio", añoActual);

    document.getElementById("folio").value = folio;
}

function generarXML() {
    

    let datos = {
        rfcContribuyente: document.getElementById("rfcContribuyente").value,
        rfcRepresentanteLegal: document.getElementById("rfcRepresentanteLegal").value,
        rfcProveedorDictamen: document.getElementById("rfcProveedor").value,
        rfcRepresentanteLegalProveedor: document.getElementById("rfcRepresentanteLegalProveedor").value,
        fechaEmisionDictamen: document.getElementById("fecha").value,
numeroFolioDictamen: document.getElementById("folio").value,
        Producto: document.getElementById("Producto").value,
        rfcPersonal: document.getElementById("rfcPersonal").value
    };

    let xml = `<?xml version="1.0" encoding="utf-8"?>
<Covol:Dictamen
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:Covol="https://repositorio.cloudb.sat.gob.mx/Covol/xml/Dictamen"
xsi:schemaLocation="https://repositorio.cloudb.sat.gob.mx/Covol/xml/Dictamen https://repositorio.cloudb.sat.gob.mx/Covol/xml/Dictamen.xsd">

<Covol:RfcContribuyente>${datos.rfcContribuyente}</Covol:RfcContribuyente>
<Covol:RfcRepresentanteLegal>${datos.rfcRepresentanteLegal}</Covol:RfcRepresentanteLegal>
<Covol:RfcProveedorDictamen>${datos.rfcProveedorDictamen}</Covol:RfcProveedorDictamen>
<Covol:RfcRepresentanteLegalProveedor>${datos.rfcRepresentanteLegalProveedor}</Covol:RfcRepresentanteLegalProveedor>

<Covol:InformacionPrueba>
<Covol:FechaEmisionDictamen>${datos.fechaEmisionDictamen}</Covol:FechaEmisionDictamen>
<Covol:NumeroFolioDictamen>${datos.numeroFolioDictamen}</Covol:NumeroFolioDictamen>
<Covol:Producto>${datos.Producto}</Covol:Producto>
<Covol:RfcPersonal>${datos.rfcPersonal}</Covol:RfcPersonal>
</Covol:InformacionPrueba>

</Covol:Dictamen>`;
  

    // Descargar el XML
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;

  enlace.download = datos.numeroFolioDictamen + ".xml";

    document.body.appendChild(enlace);
    enlace.click();

    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
}