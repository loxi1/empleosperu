$(document).ready(function () {

  // ✅ ruta del PDF (relativa a Ver.html)
  // Si Ver.html está en /CertificadoUnicoLaboral/Ver.html
  // entonces el PDF en /CertificadoUnicoLaboral/files/...
  const pdfUrl = './files/certificado.pdf';

  let pdfDoc = null;
  let pageNum = 1;
  let pageRendering = false;
  let pageNumPending = null;

  const scale = 1.6; // ajusta si lo quieres más grande
  const canvas = document.getElementById('the-canvas');
  const ctx = canvas.getContext('2d');

  function renderPage(num) {
    pageRendering = true;

    pdfDoc.getPage(num).then(function (page) {
      const viewport = page.getViewport({ scale: scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderTask = page.render({ canvasContext: ctx, viewport: viewport });
      return renderTask.promise;
    }).then(function () {
      pageRendering = false;

      if (pageNumPending !== null) {
        const next = pageNumPending;
        pageNumPending = null;
        renderPage(next);
      }
    });

    document.getElementById('page_num').textContent = num;
  }

  function queueRenderPage(num) {
    if (pageRendering) pageNumPending = num;
    else renderPage(num);
  }

  document.getElementById('prev').addEventListener('click', function () {
    if (!pdfDoc || pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
  });

  document.getElementById('next').addEventListener('click', function () {
    if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
  });

  // ✅ Cargar documento
  pdfjsLib.getDocument(pdfUrl).promise
    .then(function (pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById('page_count').textContent = pdfDoc.numPages;
      renderPage(pageNum);
    })
    .catch(function (err) {
      console.error(err);
      alert('Error cargando el PDF: ' + err.message);
    });

});