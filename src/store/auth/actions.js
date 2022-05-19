export default {
  autoLogin({ commit, email, username }) {
    commit("autoLogin");
    return email != null && username != null;
  },
  async login({ commit }, payload) {
    if (!payload.email || !payload.password)
      return { status: 0, error: "email or password is incorrect" };
    let error;
    let status;
    const result = await fetch(
      `http://localhost:3000/user?email=${payload.email}&password=${payload.password}`
    ).catch(() => {
      error = "email or password isn't correct";
      status = 0;
    });

    const data = await result.json();
    if (data.length === 0) {
      error = "email or password isn't correct";
      status = 0;
    } else {
      status = 1;
    }
    if (status) {
      commit("login", { username: data[0].username, email: data[0].email });
      localStorage.setItem("username", data[0].username);
      localStorage.setItem("email", data[0].email);
    }
    return { status, error };
  },
  logout({ commit }) {
    commit("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  },
};
