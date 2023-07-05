const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateHeader = (pdfDoc) => {
    pdfDoc
        .fillColor("#444444")
        .fontSize(20)
        .text('SimonsTarget Inc.', 50, 45)
        .fontSize(10)
        .text("SimonsTarget Inc.", 200, 50, { align: "right" })
        .text('87 Elm Street', 200, 65, { align: 'right' })
        .text('Portland, OR, 97128', 200, 80, { align: 'right' })
        .moveDown();
}

const generateFooter = (pdfDoc) => {
    pdfDoc
        .fontSize(10)
        .text('Payment is due within 7 days. Thank you for your business.', 50, 780, { align: 'center', width: 500 });
}

const generateTitle = (pdfDoc, order) => {
    pdfDoc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(pdfDoc, 185);

    const titleTop = 200;

    pdfDoc
        .fontSize(10)
        .text("Invoice Id:", 50, titleTop)
        .font("Helvetica-Bold")
        .text(order._id, 150, titleTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, titleTop + 15)
        .text(formatDate(new Date()), 150, titleTop + 15)
        .text("Client Id:", 50, titleTop + 30)
        .text(order.userId, 150, titleTop + 30)
        .moveDown();

    generateHr(pdfDoc, 252);
}

const generateTableRow = (pdfDoc, y, c1, c2, c3, c4) => {
    pdfDoc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 260, y, { width: 90, align: 'right' })
        .text(c3, 350, y, { width: 90, align: 'right' })
        .text(c4, 0, y, { align: 'right' });
}

const generateInvoiceTable = (pdfDoc, order) => {
    let i;
    const invoiceTableTop = 330;

    pdfDoc.font("Helvetica-Bold");
    generateTableRow(
        pdfDoc,
        invoiceTableTop,
        "Product Name",
        "Price",
        "Quantity",
        "Sum"
    );
    generateHr(pdfDoc, invoiceTableTop + 20);
    pdfDoc.font("Helvetica");

    let totalPrice = 0;
    for (i = 0; i < order.orderItems.length; i++) {
        const item = order.orderItems[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            pdfDoc,
            position,
            item.product.name,
            formatCurrency(item.product.price),
            item.quantity,
            formatCurrency(item.quantity * item.product.price)
        );
        generateHr(pdfDoc, position + 20);
        totalPrice += item.quantity * item.product.price;
    }

    const totalPosition = invoiceTableTop + (i + 1) * 30;
    pdfDoc.font("Helvetica-Bold");
    generateTableRow(
        pdfDoc,
        totalPosition,
        "",
        "Total Price",
        "",
        formatCurrency(totalPrice)
    );
    pdfDoc.font("Helvetica");
}

const generateHr = (pdfDoc, y) => {
    pdfDoc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

const formatCurrency = (price) => {
    return '$' + price.toFixed(2);
}

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '/' + month + '/' + day;
}

const writePDFInvoice = (res, order) => {
    const invoiceName = 'invoice-' + order._id + '.pdf';
    const invoicePath = path.join('resources', 'invoices', invoiceName);
    const pdfDoc = new PDFDocument({ size: "A4", margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    generateHeader(pdfDoc);
    generateTitle(pdfDoc, order);
    generateInvoiceTable(pdfDoc, order);
    generateFooter(pdfDoc);
    pdfDoc.end();
}

exports.writePDFInvoice = writePDFInvoice;