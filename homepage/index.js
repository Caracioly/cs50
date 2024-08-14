document.addEventListener('DOMContentLoaded', () => {
    const aboutMeBtn = document.getElementById("about-me");
    const hobbyBtn = document.getElementById("hobby");
    const surpriseBtn = document.getElementById("surprise");

    aboutMeBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/about-me';
    })

    hobbyBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/hobby';
    })

    surpriseBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/surprise';
    })
})
