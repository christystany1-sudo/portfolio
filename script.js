console.log("JS LOADED");

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  console.log("Form:", form); // should NOT be null

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    try {
      await fetch("https://portfolio-89dd.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      alert("Message sent ✅");
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  });
});