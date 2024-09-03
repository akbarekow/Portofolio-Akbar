$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

// Memilih tombol dengan id 'confettiButton'
document.getElementById('confettiButton').addEventListener('click', function() {
    const duration = 5000; // Durasi confetti dalam milidetik (5 detik)
    const end = Date.now() + duration;

    (function frame() {
        // Menjalankan confetti dengan opsi yang diatur
        confetti({
            particleCount: 3,
            startVelocity: 30,
            spread: 360,
            origin: { x: Math.random(), y: 0 } // Menentukan confetti muncul dari atas
        });

        // Lanjutkan confetti sampai waktu habis
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});




// document.addEventListener('visibilitychange', function () {
//     if (document.visibilityState === "visible") {
//         document.title = "Portfolio Akbar Eko Wicaksono";
//         // Mencegah caching
//         document.getElementById("favicon").setAttribute("href", "https://akbarekow.github.io/Portofolio-Akbar/assets/images/profile2.jpg" + new Date().getTime());
//     } else {
//         document.title = "Come Back To Portfolio";
//         // Mencegah caching
//         document.getElementById("favicon").setAttribute("href", "./assets/images/favhand.png?" + new Date().getTime());
//     }
// });


//     document.addEventListener("DOMContentLoaded", function() {
//     var titleText = "   Selamat Datang di Portofolio Akbar Eko Wicaksono  |"; // Beri spasi di awal dan akhir untuk jarak
//     var speed = 200; // Kecepatan dalam milidetik

//     function scrollTitle() {
//         document.title = titleText;
//         titleText = titleText.substring(1) + titleText.charAt(0);
//         setTimeout(scrollTitle, speed);
//     }

//     scrollTitle();
// });


// Hitung umur otomatis Start
// Masukkan tanggal lahir Anda di sini
const birthDate = new Date('1995-09-10');

function calculateAge(birthDate) {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    // Jika bulan kurang dari 0, kurangi usia tahun dan tambahkan 12 ke bulan
    if (months < 0) {
        years--;
        months += 12;
    }

    // Jika tanggal hari ini lebih kecil dari tanggal lahir di bulan yang sama, kurangi 1 bulan
    if (today.getDate() < birthDate.getDate()) {
        months--;
    }

    // Jika hasil bulan negatif, perbaiki dengan menyesuaikan tahun
    if (months < 0) {
        months += 12;
        years--;
    }

    return `${years} tahun ${months} bulan`;
}

document.getElementById('age').innerText = calculateAge(birthDate);
// Hitung umur otomatis End

// Tombol scrolling
// document.getElementById('scroll-indicator').addEventListener('click', function() {
//     window.scrollTo({
//         top: document.body.scrollHeight, // Scroll ke bagian bawah halaman
//         behavior: 'smooth' // Tambahkan animasi scroll yang halus
//     });
// });



// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Staf Administrasi Umum", "Staf Administrasi Keuangan", "Kasir", "Videografer", "Video Editor", "Graphic Designer", "Freelancer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response;
    
    // Hanya ambil data dari 'skills.json'
    if (type === "skills") {
        response = await fetch("skills.json");
        const data = await response.json();
        return data;
    } else {
        // Tidak ada aksi jika type bukan 'skills'
        return null;
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 500);
}
window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
// (function () {
//     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//     s1.async = true;
//     s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
//     s1.charset = 'UTF-8';
//     s1.setAttribute('crossorigin', '*');
//     s0.parentNode.insertBefore(s1, s0);
// })();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
