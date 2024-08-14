document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back');
    const aboutMeBtn = document.getElementById("about-me");
    const hobbyBtn = document.getElementById("hobby");

    backBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/index.html';
    })


    aboutMeBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/about-me';
    })

    hobbyBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/hobby';
    })

})

