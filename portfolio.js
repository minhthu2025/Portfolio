// ==========================================
// 1. HEADER KHI CUỘN TRANG
// ==========================================

const header = document.querySelector(".header");

// Hàm cập nhật giao diện header
function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

// Theo dõi khi người dùng cuộn trang
window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

// Kiểm tra ngay khi tải trang
updateHeader();


// ==========================================
// 2. MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");


// Hàm đóng menu
function closeMenu() {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Mở menu"
    );

}


// Hàm mở hoặc đóng menu
function toggleMenu() {

    if (!menuToggle || !navMenu) return;

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Đóng menu" : "Mở menu"
    );

}


// Xử lý khi nhấn nút menu
if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );

}


// Đóng menu khi chọn mục điều hướng
navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        closeMenu();

    });

});


// Đóng menu khi nhấn Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeMenu();

    }

});


// Đóng menu khi chuyển sang màn hình lớn
window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});


// Đóng menu khi nhấn bên ngoài
document.addEventListener("click", function (event) {

    if (!menuToggle || !navMenu) return;

    const clickedInsideMenu = navMenu.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        closeMenu();

    }

});


// ==========================================
// 3. ACTIVE NAVIGATION
// ==========================================

const sections = document.querySelectorAll(
    "main section[id]"
);


// Hàm cập nhật mục menu đang được chọn
function setActiveNavigation(sectionId) {

    navLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        if (href === "#" + sectionId) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "location"
            );

        } else {

            link.classList.remove("active");

            link.removeAttribute("aria-current");

        }

    });

}


// Xác định section đang hiển thị
function updateActiveSection() {

    const position =
        window.scrollY + window.innerHeight * 0.4;

    let currentSection = "home";

    sections.forEach(function (section) {

        if (section.offsetTop <= position) {

            currentSection = section.id;

        }

    });

    setActiveNavigation(currentSection);

}


// Cập nhật khi cuộn trang
window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
);


// Cập nhật khi thay đổi kích thước màn hình
window.addEventListener(
    "resize",
    updateActiveSection
);


// Kiểm tra ngay khi tải trang
updateActiveSection();


// ==========================================
// 4. HIỆU ỨNG XUẤT HIỆN KHI CUỘN
// ==========================================

const revealElements = document.querySelectorAll(
    ".reveal"
);


// Kiểm tra người dùng có bật giảm chuyển động không
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// Chỉ chạy hiệu ứng khi trình duyệt hỗ trợ
if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
) {

    // Kích hoạt chế độ animation
    document.documentElement.classList.add(
        "js-ready"
    );


    // Tạo IntersectionObserver
    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                // Khi phần tử xuất hiện trong màn hình
                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    // Ngừng theo dõi sau khi đã xuất hiện
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.08,
            rootMargin: "0px 0px -20px 0px"
        }

    );


    // Theo dõi tất cả phần tử có class reveal
    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

}


// ==========================================
// 5. XỬ LÝ ẢNH ĐẠI DIỆN
// ==========================================

const avatar = document.querySelector("#avatar");

if (avatar) {

    const imageFrame = avatar.closest(
        ".image-frame"
    );


    // Hiển thị chữ MT khi ảnh không tồn tại
    function showAvatarPlaceholder() {

        avatar.style.display = "none";

        if (imageFrame) {

            imageFrame.classList.add(
                "no-image"
            );

        }

    }


    // Khi tải ảnh bị lỗi
    avatar.addEventListener(
        "error",
        showAvatarPlaceholder
    );


    // Kiểm tra trường hợp ảnh đã tải lỗi
    // trước khi JavaScript đăng ký sự kiện
    if (
        avatar.complete &&
        avatar.naturalWidth === 0
    ) {

        showAvatarPlaceholder();

    }

}


// ==========================================
// 6. XỬ LÝ LINK CHƯA CẬP NHẬT
// ==========================================

// Các liên kết có data-placeholder="true"
// sẽ tạm thời không hoạt động.
//
// Khi đã điền link thật trong portfolio.html,
// cần xóa data-placeholder="true".
//
// Ví dụ:
//
// TRƯỚC:
// <a href="#" data-placeholder="true">
//
// SAU:
// <a href="https://facebook.com/username">

const placeholderLinks = document.querySelectorAll(
    '[data-placeholder="true"]'
);


placeholderLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

    });

});


// ==========================================
// 7. HIỆU ỨNG CUỘN VỀ ĐẦU TRANG
// ==========================================

const backToTopLinks = document.querySelectorAll(
    'a[href="#home"]'
);


backToTopLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const homeSection = document.querySelector(
            "#home"
        );

        if (!homeSection) return;

        event.preventDefault();

        // Kiểm tra chế độ giảm chuyển động
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({

            top: 0,

            behavior: reduceMotion ? "auto" : "smooth"

        });

        // Đóng mobile menu nếu đang mở
        closeMenu();

    });

});


// ==========================================
// 8. TỐI ƯU SCROLL EVENT
// ==========================================

// Sử dụng requestAnimationFrame để hạn chế
// việc chạy nhiều lần khi người dùng cuộn trang.

let scrollTicking = false;


function handleScroll() {

    if (!scrollTicking) {

        window.requestAnimationFrame(function () {

            updateHeader();

            updateActiveSection();

            scrollTicking = false;

        });

        scrollTicking = true;

    }

}


// Thay thế hai listener cuộn trang trước đó
// bằng một listener đã được tối ưu.

window.removeEventListener(
    "scroll",
    updateHeader
);

window.removeEventListener(
    "scroll",
    updateActiveSection
);

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


// ==========================================
// 9. CẬP NHẬT KHI TẢI XONG TRANG
// ==========================================

window.addEventListener("load", function () {

    // Cập nhật header
    updateHeader();

    // Cập nhật navigation
    updateActiveSection();

});