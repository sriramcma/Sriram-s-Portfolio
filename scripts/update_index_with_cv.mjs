import fs from 'fs';
import path from 'path';

const base64 = fs.readFileSync('scripts/pdf_base64.txt', 'utf8').trim();
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Hero CTAs: Replace View Projects and Contact Me and Download CV
const oldHeroCtas = `<div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#projects" class="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/20 transition-all flex items-center gap-2">
              <span>View Projects</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
            
            <a href="#contact" class="px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Contact Me
            </a>

            <button onclick="openResumeModal()" class="px-4 py-3 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>Download CV</span>
            </button>
          </div>`;

const newHeroCtas = `<div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="#projects" class="px-5 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/20 transition-all flex items-center gap-2">
              <span>View Projects</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
            
            <a href="#contact" class="px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Contact Me
            </a>

            <!-- Download CV Button - downloads exact Sriram_S_Resume.pdf -->
            <a href="/Sriram_S_Resume.pdf" download="Sriram_S_Resume.pdf" onclick="downloadResumePDF(event)" class="px-5 py-3 rounded-lg text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 shadow-sm transition-all flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>Download CV</span>
            </a>

            <!-- Preview CV button -->
            <button onclick="openResumeModal()" class="px-3.5 py-3 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5" title="Preview Resume in viewer">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Preview</span>
            </button>
          </div>`;

if (!html.includes('<!-- Download CV Button - downloads exact Sriram_S_Resume.pdf -->')) {
  html = html.replace(oldHeroCtas, newHeroCtas);
}

// 2. Replace Resume Modal content to exactly match user's actual CV
const oldResumeModalRegex = /<!-- RESUME PREVIEW MODAL -->[\s\S]*?<!-- TOAST NOTIFICATION -->/;

const newResumeModal = `<!-- RESUME PREVIEW MODAL -->
  <div id="resumeModal" class="fixed inset-0 z-50 hidden bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
    <div class="bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-2xl max-w-3xl w-full p-4 sm:p-6 max-h-[92vh] overflow-y-auto shadow-2xl relative space-y-4">
      
      <!-- Modal Top Controls -->
      <div class="flex items-center justify-between border-b border-slate-200 dark:border-dark-border pb-3">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
          <h3 class="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white">Actual Curriculum Vitae — Sriram S</h3>
        </div>
        <div class="flex items-center gap-2">
          <a href="/Sriram_S_Resume.pdf" download="Sriram_S_Resume.pdf" onclick="downloadResumePDF(event)" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>Download PDF</span>
          </a>
          <button onclick="closeResumeModal()" class="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg">
            ✕
          </button>
        </div>
      </div>

      <!-- CV Paper View replicating the exact visual layout of user's CV -->
      <div class="bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow border border-slate-200 font-sans space-y-6">
        
        <!-- Header Dark Charcoal Banner -->
        <div class="bg-[#383838] text-white py-5 px-6 rounded-md text-center">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-wider uppercase font-sans">SRIRAM S</h2>
          <p class="text-sm font-normal text-slate-200 mt-1">Web Developer</p>
        </div>

        <!-- 2 Columns Body -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-[#2b2b2b]">
          
          <!-- Left Column -->
          <div class="md:col-span-4 space-y-5 border-b md:border-b-0 md:border-r border-slate-200 pb-5 md:pb-0 md:pr-4">
            
            <!-- Contact -->
            <div class="space-y-1.5">
              <h4 class="font-bold text-sm text-[#1f1f1f] tracking-wide border-b border-[#2b2b2b] pb-1 uppercase">CONTACT</h4>
              <p class="pt-1"><span class="font-semibold">Mobile:</span> +916381666824</p>
              <p><span class="font-semibold">Email:</span> sriramsivababu@gmail.com</p>
              <p><span class="font-semibold">LinkedIn:</span> <a href="https://www.linkedin.com/in/sri-ram10/" target="_blank" class="text-indigo-600 underline">Sriram S</a></p>
            </div>

            <!-- Skills -->
            <div class="space-y-1.5">
              <h4 class="font-bold text-sm text-[#1f1f1f] tracking-wide border-b border-[#2b2b2b] pb-1 uppercase">SKILLS</h4>
              <ul class="space-y-1 pt-1 list-none">
                <li>• Vue Js</li>
                <li>• Laravel</li>
                <li>• Javascript</li>
                <li>• WordPress</li>
                <li>• Github</li>
              </ul>
            </div>

            <!-- Education -->
            <div class="space-y-2">
              <h4 class="font-bold text-sm text-[#1f1f1f] tracking-wide border-b border-[#2b2b2b] pb-1 uppercase">EDUCATION</h4>
              <div class="pt-1 space-y-1">
                <p class="font-bold text-rose-600">2018 - 2021</p>
                <p class="font-bold text-slate-900">B.Com[General]</p>
                <p class="text-slate-600 text-[11px] leading-tight">Swami Dayananda College of Arts & Science, Thiruvarur</p>
              </div>
              <div class="pt-2 space-y-1">
                <p class="font-bold text-rose-600">2016 - 2018</p>
                <p class="font-bold text-slate-900">HSC</p>
                <p class="text-slate-600 text-[11px] leading-tight">V.S Boys Higher Secondary School, Thiruvarur</p>
              </div>
            </div>

            <!-- Certifications -->
            <div class="space-y-2">
              <h4 class="font-bold text-sm text-[#1f1f1f] tracking-wide border-b border-[#2b2b2b] pb-1 uppercase">CERTIFICATIONS</h4>
              <div class="pt-1 space-y-0.5">
                <p class="font-bold text-slate-900">Web Designing</p>
                <p class="text-slate-600 text-[11px]">Certified by Code Master Academy</p>
                <p class="text-slate-800 text-[11px] font-medium">12/2021 - 01/2022</p>
              </div>
              <div class="pt-2 space-y-0.5">
                <p class="font-bold text-slate-900">UI Development -React JS</p>
                <p class="text-slate-600 text-[11px]">Certified by FITA Academy</p>
                <p class="text-slate-800 text-[11px] font-medium">10/2022 - 12/2022</p>
              </div>
            </div>

          </div>

          <!-- Right Column -->
          <div class="md:col-span-8 space-y-5 md:pl-2">
            
            <!-- Work Experience -->
            <div class="space-y-2">
              <h4 class="font-bold text-sm text-[#1f1f1f] tracking-wide border-b border-[#2b2b2b] pb-1 uppercase">WORK EXPERIENCE</h4>
              <div class="pt-1 flex items-baseline justify-between">
                <div>
                  <p class="font-bold text-slate-900 text-xs">Web Developer</p>
                  <p class="font-medium text-slate-700 text-[11px]">Zenbiller Software Solutions</p>
                </div>
                <span class="text-slate-600 text-[11px] font-medium">06/2023 - Present</span>
              </div>
              <ul class="space-y-1.5 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Web Developer with 3+ years of experience in developing scalable and responsive web applications.</li>
                <li>Specialized in Laravel and Vue.js, with hands-on experience in developing dynamic web applications, API integration, and backend systems.</li>
                <li>Experienced in customizing business software solutions and maintaining multiple websites.</li>
                <li>Collaborating with cross-functional teams to deliver efficient and user-focused solutions.</li>
              </ul>
            </div>

            <!-- Projects -->
            <div class="space-y-4">
              <h4 class="font-bold text-sm text-[#1f1f1f] tracking-wide border-b border-[#2b2b2b] pb-1 uppercase">PROJECTS</h4>
              
              <!-- Project 1 -->
              <div class="space-y-1">
                <p class="font-bold text-slate-900 text-xs">ZenBiller – Retail Billing Software</p>
                <ul class="space-y-1 text-slate-700 leading-relaxed list-disc list-inside">
                  <li>Worked on assigned retail modules by understanding existing application flows and implementing features based on product, inventory, purchase, and sales requirements.</li>
                  <li>Developed dynamic frontend modules using Vue.js for product management, stock handling, purchase entry, and sales-related workflows.</li>
                  <li>Built responsive layouts and styled Vue.js components using Bootstrap, and integrated them with Laravel APIs to display and manage application data.</li>
                  <li>Tested implemented features across related workflows to ensure accurate data handling between inventory, purchase, sales, and billing operations.</li>
                </ul>
                <p class="font-bold text-slate-900 text-[11px] pt-1">Utilized Skills: <span class="font-normal">HTML, CSS, Bootstrap, JavaScript, Vue Js, Laravel, MySQL.</span></p>
              </div>

              <!-- Project 2 -->
              <div class="space-y-1">
                <p class="font-bold text-slate-900 text-xs">ZenBiller – Restaurant Billing Software</p>
                <ul class="space-y-1 text-slate-700 leading-relaxed list-disc list-inside">
                  <li>Developed modules supporting restaurant workflows, including dine-in, takeaway orders, POS billing, kitchen operations, and ingredient-based inventory.</li>
                  <li>Built responsive order management and POS interfaces using Vue.js and Bootstrap, based on restaurant-specific operational workflows.</li>
                  <li>Integrated frontend modules with Laravel APIs to handle order creation, updates, billing data, and Kitchen Order Ticket (KOT) operations.</li>
                  <li>Tested and refined application workflows to ensure smooth data flow from order placement through kitchen processing and final billing.</li>
                </ul>
                <p class="font-bold text-slate-900 text-[11px] pt-1">Utilized Skills: <span class="font-normal">Html, Css, Bootstrap, Vue Js, Laravel, MySQL.</span></p>
              </div>

              <!-- Project 3 -->
              <div class="space-y-1">
                <p class="font-bold text-slate-900 text-xs">LIVF Fertility – Healthcare Website</p>
                <ul class="space-y-1 text-slate-700 leading-relaxed list-disc list-inside">
                  <li>Developed and maintained responsive website pages for a fertility and women’s healthcare platform, focusing on patient information and consultation journeys.</li>
                  <li>Built and customized landing pages using WordPress and Elementor, supporting campaign-specific content, lead generation, and appointment enquiries.</li>
                  <li>Integrated website forms with lead management workflows and implemented tracking using Google Tag Manager, GA4, and Meta Pixel to monitor user interactions and campaign conversions.</li>
                </ul>
                <p class="font-bold text-slate-900 text-[11px] pt-1">Utilized Skills: <span class="font-normal">Wordpress.</span></p>
              </div>

            </div>

          </div>

        </div>

      </div>

      <!-- Modal Bottom Actions -->
      <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-dark-border">
        <button onclick="window.print()" class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">
          Print
        </button>
        <a href="/Sriram_S_Resume.pdf" download="Sriram_S_Resume.pdf" onclick="downloadResumePDF(event)" class="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>Download PDF</span>
        </a>
      </div>

    </div>
  </div>

  <!-- TOAST NOTIFICATION -->`;

html = html.replace(oldResumeModalRegex, newResumeModal);

// 3. Add Base64 and downloadResumePDF function to embedded script
const scriptMarker = `// ==========================================
    // 1. Projects Data (All 14 projects from brief)`;

const downloadCode = `// ==========================================
    // 0. Resume PDF Download (Exact PDF attachment)
    // ==========================================
    const RESUME_PDF_BASE64 = "${base64}";

    function downloadResumePDF(e) {
      if (e && e.preventDefault) e.preventDefault();
      
      showToast('Downloading Sriram S Resume PDF...');

      // First try fetching the static public file
      fetch('/Sriram_S_Resume.pdf')
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.blob();
        })
        .then(blob => {
          triggerBlobDownload(blob);
        })
        .catch(() => {
          // Fallback immediately to embedded base64 binary
          downloadBase64PDF();
        });
    }

    function triggerBlobDownload(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sriram_S_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    function downloadBase64PDF() {
      try {
        const byteCharacters = atob(RESUME_PDF_BASE64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        triggerBlobDownload(blob);
      } catch (err) {
        console.error('Error generating PDF download:', err);
      }
    }

    ${scriptMarker}`;

if (!html.includes('RESUME_PDF_BASE64')) {
  html = html.replace(scriptMarker, downloadCode);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated with actual CV and PDF download handlers!');
