// main.js
// Semua interaksi halaman ZaskhiaAI dipecah jadi fungsi kecil
// biar gampang dicari & di-maintain per fitur.

/**
 * Data penyimpan raw SVG dan warna hover untuk Tech Icons.
 * Mengembalikan string HTML elemen span yang siap dirender.
 */
function getTechIconSVG(name) {
  const icons = {
    figma: {
      title: "Figma",
      hoverClass: "hover:text-white",
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M11.667 0c1.841 0 3.334 1.493 3.334 3.333S13.508 6.667 11.667 6.667H8.333V0h3.334zm0 6.667c1.841 0 3.334 1.493 3.334 3.333S13.508 13.333 11.667 13.333H8.333V6.667h3.334zm-3.334 0C6.492 6.667 5 8.16 5 10s1.492 3.333 3.333 3.333h3.334V6.667H8.333zm0-6.667C6.492 0 5 1.493 5 3.333S6.492 6.667 8.333 6.667h3.334V0H8.333zM8.333 13.333C6.492 13.333 5 14.826 5 16.667s1.492 3.333 3.333 3.333A3.333 3.333 0 0 0 11.667 16.667v-3.334H8.333z"/></svg>`,
    },
    css: {
      title: "CSS3",
      hoverClass: "hover:text-[#2965f1]",
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.143l-1.127 12.63-8.083 2.24-8.077-2.24-.356-4.013h3.553l.18 2.022 4.7.13h.007l4.7-.13.25-2.793H5.093l-.338-3.792h10.97l.192-2.15H4.372L4.034 4.143h14.557z"/></svg>`,
    },
    html: {
      title: "HTML5",
      hoverClass: "hover:text-[#e34f26]",
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-[1.375rem] h-[1.375rem]"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.143L5.41 4.143l.423 4.739h12.27l-.39 4.364-5.736 1.55-5.744-1.55-.198-2.22H2.57l.386 4.322 9.02 2.502 9.022-2.502 1.092-12.235z"/></svg>`,
    },
    php: {
      title: "PHP",
      hoverClass: "hover:text-[#777bb4]",
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 2C5.373 2 0 5.582 0 10c0 3.738 4.025 6.91 9.387 7.785-.098.498-.316 1.637-.622 3.195-.084.428.324.78.718.57 2.05-1.085 4.316-2.455 5.897-3.805C18.665 16.536 24 13.568 24 10c0-4.418-5.373-8-12-8zm-1.895 10.362h-2.16l-.766 3.328H5.21l1.545-6.726h3.493c1.677 0 2.502.946 2.146 2.493-.362 1.572-1.258 2.217-2.738 2.217h.176l-.927.905zm4.87-1.312l-1.04 4.542h-1.97l1.04-4.542h1.97zm2.39-3.79c1.676 0 2.502.946 2.146 2.492-.363 1.573-1.258 2.218-2.738 2.218h-2.16l-.767 3.328h-1.97l1.545-6.726h3.493v.004h.45zm-6.22 4.195c.575 0 1.04-.374 1.203-.98.172-.746-.202-.977-.777-.977h-1.156l-.427 1.853h1.156v.104zm6.657 0c.576 0 1.04-.374 1.204-.98.172-.746-.202-.977-.778-.977h-1.157l-.427 1.853h1.157v.104z"/></svg>`,
    },
  };

  const currentIcon = icons[name.toLowerCase()];
  if (!currentIcon) return ""; // Jika ikon tidak ada, biarkan kosong

  return `
    <span 
      class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-default ${currentIcon.hoverClass}" 
      title="${currentIcon.title}"
    >
      ${currentIcon.svg}
    </span>
  `;
}

/**
 * Mencari elemen dengan atribut 'data-icons' di HTML,
 * lalu menyuntikkan icon SVG ke dalamnya secara otomatis.
 */
function initTechIcons() {
  // Cari semua pembungkus ikon di halaman
  const iconContainers = document.querySelectorAll("[data-icons]");
  if (!iconContainers.length) return;

  iconContainers.forEach((container) => {
    // Ambil string dari atribut, contoh: "figma,html,css,php"
    const iconList = container.getAttribute("data-icons").split(",");

    // Ubah list teks menjadi gabungan string HTML SVG
    const iconsHTML = iconList
      .map((iconName) => getTechIconSVG(iconName.trim()))
      .join("");

    // Suntikkan ke dalam HTML
    container.innerHTML = iconsHTML;
  });
}

/**
 * Toggle menu mobile (hamburger) buka/tutup,
 * dan auto-close ketika salah satu link menu diklik.
 */
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  if (!menuBtn || !mobileMenu) return;

  // Buka/tutp dari tombol humberger
  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isHidden));
  });

  // Tutup dari tombol silang (X) dibawah menu
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  }

  // Tutup otomatis saat salah satu link menu di klik
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Menu navigasi aktif (desktop): pindah highlight sesuai
 * link yang diklik, dan otomatis ikut section yang sedang
 * terlihat di viewport saat scroll.
 */
function initNavMenu() {
  const navMenu = document.getElementById("navMenu");
  const mainNav = document.getElementById("mainNav");
  const mobileMenu = document.getElementById("mobileMenu");

  // Ambil semua link internal (yang href-nya berawalan '#') dari kedua menu
  const desktopLinks = navMenu
    ? Array.from(navMenu.querySelectorAll("a[href^='#']"))
    : [];
  const mobileLinks = mobileMenu
    ? Array.from(mobileMenu.querySelectorAll("a[href^='#']"))
    : [];
  const allNavLinks = [...desktopLinks, ...mobileLinks];

  if (!allNavLinks.length) return;

  // Fungsi setActive sekarang menggunakan targetHref agar bisa mengubah
  // status aktif di desktop dan mobile secara serentak
  let currentActiveHref = window.location.hash || "#home";
  let isDark = false;

  function updateMenuStyle() {
    // 1. BACKGROUND WADAH MENU (Desktop & Mobile)
    const menus = [navMenu, document.getElementById("mobileMenu")];
    const divider = document.getElementById("mobileDivider");

    menus.forEach((menu) => {
      if (!menu) return;
      if (isDark) {
        // TEMA GELAP
        menu.classList.remove("bg-white", "border-black/5");
        menu.classList.add("bg-navy", "border-white/20");
      } else {
        // TEMA TERANG
        menu.classList.remove("bg-navy", "border-white/20");
        menu.classList.add("bg-white", "border-black/5");
      }
    });

    // Warna Garis Pemisah (Divider) tetap menyesuaikan tema
    if (isDark) {
      if (divider) {
        divider.classList.remove("bg-black/5");
        divider.classList.add("bg-white/10");
      }
    } else {
      if (divider) {
        divider.classList.remove("bg-white/10");
        divider.classList.add("bg-black/5");
      }
    }

    // (Kode pengaturan warna tombol close dihapus dari sini agar konsisten mengikuti HTML)

    // 2. WARNA & KETEBALAN LINK (Desktop & Mobile)
    allNavLinks.forEach((a) => {
      const isActive = a.getAttribute("href") === currentActiveHref;

      // Bersihkan semua class warna dan font
      a.classList.remove(
        "bg-navy",
        "text-white",
        "text-navy/70",
        "hover:text-navy",
        "hover:bg-black/5",
        "bg-white",
        "text-navy",
        "text-white/70",
        "hover:text-white",
        "hover:bg-white/10",
        "font-bold",
        "font-medium",
      );

      if (isDark) {
        // --- TEMA GELAP ---
        if (isActive) {
          a.classList.add("bg-white", "text-navy", "font-bold");
        } else {
          a.classList.add(
            "text-white/70",
            "hover:text-white",
            "hover:bg-white/10",
            "font-medium",
          );
        }
      } else {
        // --- TEMA TERANG ---
        if (isActive) {
          a.classList.add("bg-navy", "text-white", "font-bold");
        } else {
          a.classList.add(
            "text-navy/70",
            "hover:text-navy",
            "hover:bg-black/5",
            "font-medium",
          );
        }
      }
    });
  }

  // Set active manual saat link diklik
  allNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Hapus setActive, ganti dengan memperbarui variabel dan memanggil fungsi baru
      currentActiveHref = this.getAttribute("href");
      updateMenuStyle();
    });
  });

  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      // Update semua link (mobile & desktop) sesuai ID section yang terlihat
      currentActiveHref = `#${visible.target.id}`;

      // Buat daftar class yang dianggap mewakili background gelap
      const darkClasses = [
        "bg-navy",
        "bg-[#125066]",
        "from-[#232B45]", // Cukup ambil satu class penanda dari gradient, jangan pakai spasi
      ];

      isDark = darkClasses.some((className) =>
        visible.target.classList.contains(className),
      );

      // update pembukung nav utama
      if (mainNav) {
        if (isDark) {
          mainNav.classList.remove(
            "bg-white/70",
            "border-white/60",
            "text-navy",
          );
          mainNav.classList.add("bg-navy/80", "border-white/10", "text-white");
        } else {
          mainNav.classList.remove(
            "bg-navy/80",
            "border-white/10",
            "text-white",
          );
          mainNav.classList.add("bg-white/70", "border-white/60", "text-navy");
        }
      }
      // jalankan gaya untuk menu tengah
      updateMenuStyle();
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    },
  );
  sections.forEach((section) => observer.observe(section));
}

/**
 * Efek Animasi Ketik (Typewriter) untuk Hero Section
 */
function initTypewriter() {
  const typeWriterElement = document.getElementById("typewriter");
  if (!typeWriterElement) return;

  const roles = [
    "UI/UX Designer",
    "Graphic Designer",
    "Front End Developer",
    "Web Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    let textToShow = "";

    // Menambah atau mengurangi teks
    if (isDeleting) {
      textToShow = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textToShow = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    // Trik Mencegah Layout Loncat:
    // Jika teks kosong, isi dengan spasi transparan (\u00A0) agar tinggi elemen tetap terjaga
    typeWriterElement.textContent = textToShow === "" ? "\u00A0" : textToShow;

    // Mengatur kecepatan ketik
    let typeSpeed = isDeleting ? 50 : 100;

    // Logika jeda
    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
}

/**
 * Pagination galeri (state visual tombol aktif saja).
 * Ganti isi galeri sesuai halaman yang dipilih bisa ditambahkan
 * di sini nantinya (misal fetch data / render ulang grid).
 */
function initGalleryPagination() {
  const pageButtons = document.querySelectorAll(".page-btn");
  if (!pageButtons.length) return;

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      pageButtons.forEach((b) => {
        b.classList.remove("bg-gold", "text-navy");
        b.classList.add("text-white/70");
        b.removeAttribute("aria-current");
      });
      btn.classList.add("bg-gold", "text-navy");
      btn.classList.remove("text-white/70");
      btn.setAttribute("aria-current", "page");
    });
  });
}

/**
 * Otomatis menyuntikkan tombol "Scroll Down" ke setiap section
 * (kecuali section terakhir) dan mengatur logika smooth scroll-nya.
 * Dilengkapi deteksi otomatis background terang/gelap.
 */
function initScrollDown() {
  const sections = document.querySelectorAll("section");

  if (sections.length < 2) return;

  sections.forEach((currentSection, index) => {
    // Lewati section paling bawah
    if (index === sections.length - 1) return;

    // Tambahkan class flex-col pada section agar pembagian ruang vertikal rapi
    currentSection.classList.add("relative", "flex", "flex-col");

    const btn = document.createElement("button");
    // Gunakan relative dan margin-top (mt-20) agar tombol otomatis mencari area kosong di bawah
    btn.className =
      "relative w-fit mx-auto mt-20 mb-8 flex flex-col items-center gap-2 z-20 group";
    btn.setAttribute("aria-label", "Scroll to next section");

    // DETEKSI WARNA BACKGROUND SECTION
    // Daftar class background gelap. Sesuaikan dengan yang Anda pakai di HTML!
    const darkClasses = [
      "bg-navy",
      "bg-teal",
      "from-[#232B45]",
      "bg-[#1B1833]",
    ];

    // Cek apakah section saat ini punya salah satu class gelap di atas
    const isDark = darkClasses.some((className) =>
      currentSection.classList.contains(className),
    );

    // Siapkan warna untuk Teks, Ikon, dan Lingkaran sesuai tema section
    const textColor = isDark
      ? "text-white/90 group-hover:text-white"
      : "text-navy group-hover:text-teal-dark";
    const iconColor = isDark
      ? "text-white group-hover:text-navy"
      : "text-teal group-hover:text-teal-dark";
    const circleBg = isDark
      ? "bg-white/10 hover:bg-white/90"
      : "bg-white/30 hover:bg-white";

    // SUNTIKKAN HTML KE DALAM TOMBOL
    btn.innerHTML = `
      <div class="flex items-center justify-center w-[3.5rem] h-[3.5rem] ${circleBg} backdrop-blur-xl rounded-full shadow-2xl ${iconColor} animate-bounce transition-all duration-300">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
      <span class="${textColor} font-medium text-md tracking-wide group-hover:font-bold transition-colors duration-300">Scroll Down</span>
    `;

    // LOGIKA SCROLL HALUS
    btn.addEventListener("click", () => {
      let nextSection = currentSection.nextElementSibling;

      while (nextSection && nextSection.tagName.toLowerCase() !== "section") {
        nextSection = nextSection.nextElementSibling;
      }

      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    currentSection.appendChild(btn);
  });
}
/**
 * Animasi fade-up saat elemen masuk viewport,
 * menggunakan IntersectionObserver.
 */
function initScrollReveal() {
  const fadeUpElements = document.querySelectorAll(".fade-up");
  if (!fadeUpElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  fadeUpElements.forEach((el) => observer.observe(el));
}

/**
 * Entry point: jalankan semua init function setelah DOM siap.
 */
function initApp() {
  initMobileMenu();
  initNavMenu();
  initTypewriter();
  initGalleryPagination();
  initScrollDown();
  initScrollReveal();
  initTechIcons();
}

document.addEventListener("DOMContentLoaded", initApp);
