const TARGET = 18250000;

const counter =
    document.getElementById("counter");

const progress =
    document.getElementById("progressBar");

let started = false;

function animateCounter() {

    if(started) return;

    started = true;

    let current = 0;

    const duration = 2500; // 2.5 ثانية

    const fps = 60;

    const steps =
        duration / (1000 / fps);

    const increment =
        TARGET / steps;

    const animation =
        setInterval(() => {

            current += increment;

            if(current >= TARGET){

                current = TARGET;

                clearInterval(
                    animation
                );
            }

            counter.innerHTML =
                Math.floor(current)
                .toLocaleString('en-US');

            progress.style.width =
                (current / TARGET) *
                100 + "%";

        }, 1000 / fps);
}

function goProject(){

    animateCounter();

    document
        .getElementById("project")
        .scrollIntoView({
            behavior:"smooth"
        });
}
