var toastDuration = 6500;
var textSpeed = 50;

function showToast(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');

    toast.style.opacity = "0";
    // fade-in toast
    toast.style.transition = "opacity 0.5s ease-in-out";
    setTimeout(() => {
        toast.style.opacity = "1";
    }, 10); // increase after 10 ms to create pause after click and give time for initial opacity to set

    document.body.appendChild(toast); // display toast in the body element

    // removes toast after time duration is up
    setTimeout(() => {
        // fade-out toast
        toast.style.opacity = "0";
        setTimeout(() => {toast.remove();}, 500); // wait for animation to finish before removing
    }, toastDuration);

    // appends letter every textSpeed milliseconds by creating delays for each letter
    for (let i = 0; i < msg.length; i++) {
        setTimeout(() => {
            toast.innerHTML += msg[i];
        }, i * textSpeed); 
    }
}