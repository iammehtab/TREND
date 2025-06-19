const countdown = document.getElementById("countdown");
const targetDate = new Date("May 17,2025 23:59:59").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) {
    countdown.textcontent = "Offer Expired";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdown.textContent = `${days}d: ${hours}h : ${minutes}m : ${seconds}s `;
};

setInterval(updateCountdown, 1000);

// TO Check whether user is login in or not
document
  .getElementById("categories-link")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const isloggedin = localStorage.getItem("isloggedin");
    if (isloggedin === "true") {
      window.location.href = "categories.html";
    } else {
      window.location.href = "register.html";
    }
  });
