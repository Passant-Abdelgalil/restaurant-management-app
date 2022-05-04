<template>
  <div class="signup">
    <img class="signup__img" src="../assets/restaurant.png" alt="sign up" />
    <h1 class="signup__heading">Sign Up</h1>
    <form class="signup__form" @submit.prevent="signup">
      <input
        class="form__input"
        type="text"
        name="username"
        placeholder="Username"
        aria-label="your username"
        v-model="username"
        @input="validateUsername"
      />
      <small class="error-msg" v-if="usernameErrMsg">{{
        usernameErrMsg
      }}</small>
      <input
        class="form__input"
        type="email"
        name="email"
        placeholder="Email"
        aria-label="your email"
        v-model="email"
        @input="validateEmail"
      />
      <small class="error-msg" v-if="emailErrMsg">{{ emailErrMsg }}</small>

      <input
        class="form__input"
        type="password"
        name="password"
        placeholder="Password"
        aria-label="your password"
        v-model="password"
        @input="validatePassword"
      />
      <small class="error-msg" v-if="passwordErrMsg">{{
        passwordErrMsg
      }}</small>

      <input
        class="form__input signup--btn"
        type="submit"
        value="Sign Up"
        aria-label="Sign up"
        :disabled="invalid"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      emailErrMsg: null,
      usernameErrMsg: null,
      passwordErrMsg: null,
    };
  },
  computed: {
    invalid() {
      return (
        this.usernameErrMsg ||
        this.emailErrMsg ||
        this.passwordErrMsg ||
        !this.username ||
        !this.email ||
        !this.password
      );
    },
  },
  methods: {
    validateEmail() {
      let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      const valid = emailRegex.test(this.email);
      this.emailErrMsg = valid ? null : "please enter a valid email";
      return valid;
    },
    validatePassword() {
      let emailName = this.email.substring(0, this.email.indexOf("@"));
      let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      emailName = emailName === "" ? null : emailName;
      const valid =
        passwordRegex.test(this.password) && !this.password.includes(emailName);
      this.passwordErrMsg = valid
        ? null
        : "password must be at least 8 characters and shouldn't include your name";

      return valid;
    },
    validateUsername() {
      let usernameRegex =
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
      const valid = usernameRegex.test(this.username);
      this.usernameErrMsg = valid
        ? null
        : "username must be 8-20 long including letters and numbers";

      return valid;
    },
    validateForm() {
      if (
        this.validateUsername() &&
        this.validatePassword() &&
        this.validateEmail()
      )
        return (this.inValid = true);
      this.inValid = false;
      return false;
    },
    async signup() {
      if (!this.validateForm()) return;
      let result = await fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!result.ok) return;
      let data = await result.json();
      localStorage.setItem("user-email", data.email);
      localStorage.setItem("user-username", data.username);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss" scoped>
$form-color: #a87942;
$form-input-padding: 10px;
$form-input-left-padding: 2 * $form-input-padding;
$form-font-size: 15px;
$form-input-border-radius: 6px;
$form-height: 300px;
$form-max-width: 400px;

.signup__img {
  width: 120px;
}
.signup__heading {
  padding: 30px;
  padding-top: 10px;
  margin: 0;
}
.signup__form {
  position: relative;
  height: $form-height;
  max-width: $form-max-width;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form__input {
  border-radius: $form-input-border-radius;
  border: 1px solid #eee;
  font-size: $form-font-size;
  line-height: 2;
  padding: $form-input-padding;
  padding-left: $form-input-left-padding;
  &:focus {
    outline: none;
    border-color: $form-color;
  }
}

.signup--btn {
  border: none;
  background-color: $form-color;
  color: white;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  padding-left: $form-input-padding;
  &:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
  }
}
.error-msg {
  text-align: left;
  color: red;
  margin-top: -5px;
  padding-left: 10px;
}
</style>
