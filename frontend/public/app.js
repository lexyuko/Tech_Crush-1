document.addEventListener("DOMContentLoaded", () => {
  console.log("APP JS LOADED ON:", location.pathname);

  // IMPORTANT:
  // Use relative /api paths so nginx can proxy to backend inside docker network.
  // Your nginx.conf should proxy: /api/  ->  http://group-1-backend:5000/
  const API_BASE = "/api";

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutMessage = document.getElementById("logoutMessage");

  //  LOGIN 
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const msg = document.getElementById("loginMessage");
      if (msg) msg.textContent = "";

      const email = loginForm.querySelector("input[name=email]")?.value?.trim();
      const password = loginForm.querySelector("input[name=password]")?.value;

      if (!email || !password) {
        if (msg) msg.textContent = "Email and password required.";
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        let data = {};
        try { data = await res.json(); } catch (_) {}

        if (res.ok && (data.success === undefined || data.success === true)) {
          if (msg) msg.textContent = data.message || "Successfully Logged in";

          // Optional: store user if backend sends it 
          if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 400);
        } else {
          if (msg) msg.textContent = data.message || "Login failed.";
        }
      } catch (err) {
        if (msg) msg.textContent = "Login failed.";
      }
    });
  }

  //  SIGNUP 
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const msg = document.getElementById("signupMessage");
      if (msg) msg.textContent = "";

      const email = signupForm.querySelector("input[name=email]")?.value?.trim();
      const userName = signupForm.querySelector("input[name=userName]")?.value?.trim();
      const name = signupForm.querySelector("input[name=name]")?.value?.trim();
      const password = signupForm.querySelector("input[name=password]")?.value;

      if (!email || !userName || !name || !password) {
        if (msg) msg.textContent = "Email, userName, name and password required.";
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, userName, name, password }),
        });

        let data = {};
        try { data = await res.json(); } catch (_) {}

        if (res.ok && (data.success === undefined || data.success === true)) {
          if (msg) msg.textContent = data.message || "Account Successfully Created";

          
          if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 400);
        } else {
          if (msg) msg.textContent = data.message || "Signup failed.";
        }
      } catch (err) {
        if (msg) msg.textContent = "Signup failed.";
      }
    });
  }

  // LOGOUT 
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // simple frontend logout
      localStorage.removeItem("user");
      if (logoutMessage) logoutMessage.textContent = "Logged out.";
      window.location.href = "login.html";
    });
  }
});