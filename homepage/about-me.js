document.addEventListener('DOMContentLoaded', () => {
    const hobbyBtn = document.getElementById("hobby");
    const surpriseBtn = document.getElementById("surprise");
    const backBtn = document.getElementById('back');

    backBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/index.html';
    })


    hobbyBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/hobby';
    })

    surpriseBtn.addEventListener('click', () =>{
        window.location.href = '/homepage/surprise';
    })
})
