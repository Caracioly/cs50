document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back');
    const surpriseBtn = document.getElementById("surprise");
    const aboutMeBtn = document.getElementById("about-me");

    backBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/index.html';
    })

    aboutMeBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/about-me';
    })

    surpriseBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/surprise';
    })

})

