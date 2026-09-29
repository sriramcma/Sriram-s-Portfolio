import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  // A4 Page: 595.28 x 841.89 pt
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const darkHeader = rgb(0.22, 0.22, 0.22);
  const textDark = rgb(0.15, 0.15, 0.15);
  const textMuted = rgb(0.35, 0.35, 0.35);
  const textRed = rgb(0.85, 0.12, 0.15);
  const dividerLine = rgb(0.85, 0.85, 0.85);

  // 1. Top Header Banner
  const headerHeight = 75;
  const headerY = height - 36 - headerHeight;
  const headerX = 36;
  const headerWidth = width - 72;

  page.drawRectangle({
    x: headerX,
    y: headerY,
    width: headerWidth,
    height: headerHeight,
    color: darkHeader,
  });

  const titleText = 'SRIRAM S';
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 22);
  page.drawText(titleText, {
    x: headerX + (headerWidth - titleWidth) / 2,
    y: headerY + 42,
    size: 22,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  const subtitleText = 'Web Developer';
  const subtitleWidth = fontRegular.widthOfTextAtSize(subtitleText, 11);
  page.drawText(subtitleText, {
    x: headerX + (headerWidth - subtitleWidth) / 2,
    y: headerY + 22,
    size: 11,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Layout Columns
  const leftX = 36;
  const leftWidth = 150;
  const rightX = 208;
  const rightWidth = width - rightX - 36; // ~351 pt

  let curLeftY = headerY - 28;
  let curRightY = headerY - 28;

  // Helper function to draw wrapped text
  function drawWrappedText(text, x, y, maxWidth, font, size, color, lineHeight = 12) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? ' ' : '') + words[i];
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && line !== '') {
        page.drawText(line, { x, y: currentY, size, font, color });
        currentY -= lineHeight;
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x, y: currentY, size, font, color });
      currentY -= lineHeight;
    }
    return currentY;
  }

  // Draw bullet point with hanging indent
  function drawBullet(text, x, y, maxWidth, font, size, color, lineHeight = 12) {
    page.drawText('•', { x, y, size, font: fontBold, color });
    const indentX = x + 10;
    const availWidth = maxWidth - 10;
    const newY = drawWrappedText(text, indentX, y, availWidth, font, size, color, lineHeight);
    return newY - 2; // small gap between bullets
  }

  // ==========================================
  // LEFT COLUMN
  // ==========================================
  
  // Section: CONTACT
  page.drawText('CONTACT', { x: leftX, y: curLeftY, size: 12, font: fontBold, color: textDark });
  curLeftY -= 5;
  page.drawLine({ start: { x: leftX, y: curLeftY }, end: { x: leftX + leftWidth, y: curLeftY }, thickness: 1, color: textDark });
  curLeftY -= 14;

  page.drawText('Mobile: +916381666824', { x: leftX, y: curLeftY, size: 8.5, font: fontRegular, color: textDark });
  curLeftY -= 13;
  page.drawText('Email: sriramsivababu@gmail.com', { x: leftX, y: curLeftY, size: 8, font: fontRegular, color: textDark });
  curLeftY -= 13;
  page.drawText('LinkedIn: Sriram S', { x: leftX, y: curLeftY, size: 8.5, font: fontRegular, color: textDark });
  curLeftY -= 26;

  // Section: SKILLS
  page.drawText('SKILLS', { x: leftX, y: curLeftY, size: 12, font: fontBold, color: textDark });
  curLeftY -= 5;
  page.drawLine({ start: { x: leftX, y: curLeftY }, end: { x: leftX + leftWidth, y: curLeftY }, thickness: 1, color: textDark });
  curLeftY -= 14;

  const skills = ['Vue Js', 'Laravel', 'Javascript', 'WordPress', 'Github'];
  for (const sk of skills) {
    page.drawText('•  ' + sk, { x: leftX, y: curLeftY, size: 9, font: fontRegular, color: textDark });
    curLeftY -= 15;
  }
  curLeftY -= 15;

  // Section: EDUCATION
  page.drawText('EDUCATION', { x: leftX, y: curLeftY, size: 12, font: fontBold, color: textDark });
  curLeftY -= 5;
  page.drawLine({ start: { x: leftX, y: curLeftY }, end: { x: leftX + leftWidth, y: curLeftY }, thickness: 1, color: textDark });
  curLeftY -= 16;

  page.drawText('2018 - 2021', { x: leftX, y: curLeftY, size: 8.5, font: fontBold, color: textRed });
  curLeftY -= 12;
  page.drawText('B.Com[General]', { x: leftX, y: curLeftY, size: 9, font: fontBold, color: textDark });
  curLeftY -= 11;
  curLeftY = drawWrappedText('Swami Dayananda College of Arts & Science, Thiruvarur', leftX, curLeftY, leftWidth, fontRegular, 8, textMuted, 10);
  curLeftY -= 10;

  page.drawText('2016 - 2018', { x: leftX, y: curLeftY, size: 8.5, font: fontBold, color: textRed });
  curLeftY -= 12;
  page.drawText('HSC', { x: leftX, y: curLeftY, size: 9, font: fontBold, color: textDark });
  curLeftY -= 11;
  curLeftY = drawWrappedText('V.S Boys Higher Secondary School, Thiruvarur', leftX, curLeftY, leftWidth, fontRegular, 8, textMuted, 10);
  curLeftY -= 20;

  // Section: CERTIFICATIONS
  page.drawText('CERTIFICATIONS', { x: leftX, y: curLeftY, size: 12, font: fontBold, color: textDark });
  curLeftY -= 5;
  page.drawLine({ start: { x: leftX, y: curLeftY }, end: { x: leftX + leftWidth, y: curLeftY }, thickness: 1, color: textDark });
  curLeftY -= 16;

  page.drawText('Web Designing', { x: leftX, y: curLeftY, size: 9, font: fontBold, color: textDark });
  curLeftY -= 11;
  page.drawText('Certified by Code Master', { x: leftX, y: curLeftY, size: 8, font: fontRegular, color: textMuted });
  curLeftY -= 10;
  page.drawText('Academy', { x: leftX, y: curLeftY, size: 8, font: fontRegular, color: textMuted });
  curLeftY -= 11;
  page.drawText('12/2021 - 01/2022', { x: leftX, y: curLeftY, size: 8, font: fontRegular, color: textDark });
  curLeftY -= 16;

  page.drawText('UI Development -React JS', { x: leftX, y: curLeftY, size: 9, font: fontBold, color: textDark });
  curLeftY -= 11;
  page.drawText('Certified by FITA Academy', { x: leftX, y: curLeftY, size: 8, font: fontRegular, color: textMuted });
  curLeftY -= 11;
  page.drawText('10/2022 - 12/2022', { x: leftX, y: curLeftY, size: 8, font: fontRegular, color: textDark });


  // ==========================================
  // RIGHT COLUMN
  // ==========================================

  // Section: WORK EXPERIENCE
  page.drawText('WORK EXPERIENCE', { x: rightX, y: curRightY, size: 12, font: fontBold, color: textDark });
  curRightY -= 5;
  page.drawLine({ start: { x: rightX, y: curRightY }, end: { x: rightX + rightWidth, y: curRightY }, thickness: 1, color: textDark });
  curRightY -= 14;

  page.drawText('Web Developer', { x: rightX, y: curRightY, size: 9.5, font: fontBold, color: textDark });
  curRightY -= 12;

  page.drawText('Zenbiller Software Solutions', { x: rightX, y: curRightY, size: 9, font: fontRegular, color: textDark });
  const dateRangeText = '06/2023 - Present';
  const dateWidth = fontRegular.widthOfTextAtSize(dateRangeText, 8.5);
  page.drawText(dateRangeText, { x: rightX + rightWidth - dateWidth, y: curRightY, size: 8.5, font: fontRegular, color: textDark });
  curRightY -= 14;

  curRightY = drawBullet('Web Developer with 3+ years of experience in developing scalable and responsive web applications.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Specialized in Laravel and Vue.js, with hands-on experience in developing dynamic web applications, API integration, and backend systems.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Experienced in customizing business software solutions and maintaining multiple websites.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Collaborating with cross-functional teams to deliver efficient and user-focused solutions.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);

  curRightY -= 12;

  // Section: PROJECTS
  page.drawText('PROJECTS', { x: rightX, y: curRightY, size: 12, font: fontBold, color: textDark });
  curRightY -= 5;
  page.drawLine({ start: { x: rightX, y: curRightY }, end: { x: rightX + rightWidth, y: curRightY }, thickness: 1, color: textDark });
  curRightY -= 14;

  // Project 1
  page.drawText('ZenBiller – Retail Billing Software', { x: rightX, y: curRightY, size: 9.5, font: fontBold, color: textDark });
  curRightY -= 12;

  curRightY = drawBullet('Worked on assigned retail modules by understanding existing application flows and implementing features based on product, inventory, purchase, and sales requirements.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Developed dynamic frontend modules using Vue.js for product management, stock handling, purchase entry, and sales-related workflows.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Built responsive layouts and styled Vue.js components using Bootstrap, and integrated them with Laravel APIs to display and manage application data.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Tested implemented features across related workflows to ensure accurate data handling between inventory, purchase, sales, and billing operations.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);

  page.drawText('Utilized Skills: HTML, CSS, Bootstrap, JavaScript, Vue Js, Laravel, MySQL.', { x: rightX + 10, y: curRightY, size: 8, font: fontBold, color: textDark });
  curRightY -= 14;

  // Project 2
  page.drawText('ZenBiller – Restaurant Billing Software', { x: rightX, y: curRightY, size: 9.5, font: fontBold, color: textDark });
  curRightY -= 12;

  curRightY = drawBullet('Developed modules supporting restaurant workflows, including dine-in, takeaway orders, POS billing, kitchen operations, and ingredient-based inventory.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Built responsive order management and POS interfaces using Vue.js and Bootstrap, based on restaurant-specific operational workflows.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Integrated frontend modules with Laravel APIs to handle order creation, updates, billing data, and Kitchen Order Ticket (KOT) operations.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Tested and refined application workflows to ensure smooth data flow from order placement through kitchen processing and final billing.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);

  page.drawText('Utilized Skills: Html, Css, Bootstrap, Vue Js, Laravel, MySQL.', { x: rightX + 10, y: curRightY, size: 8, font: fontBold, color: textDark });
  curRightY -= 14;

  // Project 3
  page.drawText('LIVF Fertility – Healthcare Website', { x: rightX, y: curRightY, size: 9.5, font: fontBold, color: textDark });
  curRightY -= 12;

  curRightY = drawBullet('Developed and maintained responsive website pages for a fertility and women’s healthcare platform, focusing on patient information and consultation journeys.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Built and customized landing pages using WordPress and Elementor, supporting campaign-specific content, lead generation, and appointment enquiries.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);
  curRightY = drawBullet('Integrated website forms with lead management workflows and implemented tracking using Google Tag Manager, GA4, and Meta Pixel to monitor user interactions and campaign conversions.', rightX, curRightY, rightWidth, fontRegular, 8.5, textDark, 11);

  page.drawText('Utilized Skills: Wordpress.', { x: rightX + 10, y: curRightY, size: 8, font: fontBold, color: textDark });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const outDir = path.resolve('public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'Sriram_S_Resume.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Resume PDF generated successfully at:', outPath);
}

generateResume().catch(console.error);
