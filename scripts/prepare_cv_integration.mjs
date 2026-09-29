import fs from 'fs';
import path from 'path';

const pdfPath = path.resolve('public/Sriram_S_Resume.pdf');
if (!fs.existsSync(pdfPath)) {
  console.error('PDF file does not exist at:', pdfPath);
  process.exit(1);
}

const pdfBase64 = fs.readFileSync(pdfPath).toString('base64');
console.log('PDF Base64 length:', pdfBase64.length);

fs.writeFileSync('scripts/pdf_base64.txt', pdfBase64);
console.log('Base64 saved to scripts/pdf_base64.txt');
