/*
================================
 Golden Calendar
 Digital Astrolabe Engine

 Developed by Nemimeche Benaissa
================================
*/


// ===============================
// عداد الأيام المعالجة
// ===============================

const target = 18250000;

const counter = document.getElementById("counter");


function animateCounter(){

    let current = 0;

    const duration = 4500; // مدة الحركة بالميلي ثانية

    const startTime = performance.now();


    function update(time){

        const progress =
        Math.min(
            (time - startTime) / duration,
            1
        );


        current =
        Math.floor(
            progress * target
        );


        if(counter){

            counter.textContent =
            current.toLocaleString("en-US");

        }


        if(progress < 1){

            requestAnimationFrame(update);

        }
        else{

            counter.textContent =
            target.toLocaleString("en-US");

        }

    }


    requestAnimationFrame(update);

}



window.addEventListener(
"load",
animateCounter
);



// ===============================
// زر استكشاف المشروع
// ===============================


function goProject(){

    const section =
    document.getElementById("project");


    if(section){

        section.scrollIntoView({

            behavior:"smooth"

        });

    }

}



// ===============================
// ظهور العناصر عند التمرير
// ===============================


const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform=
"translateY(0)";


}


});


},

{

threshold:.15

}

);



// تطبيق الحركة

document
.querySelectorAll(
".card,.feature,.about"
)
.forEach(element=>{


element.style.opacity="0";

element.style.transform=
"translateY(40px)";

element.style.transition=
"all .8s ease";


observer.observe(element);


});
