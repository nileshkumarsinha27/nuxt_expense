<template>
  <div class="login-form-container">
    <h3>{{ formTitle }}</h3>
    <form autoComplete="off" @submit="handleSubmit">
      <InputBox
        v-for="(
          { name, placeholder, type, defaultValue, isClear }, key
        ) in loginFormConfiguration"
        :key="key"
        :typeSent="type"
        :placeholder="placeholder"
        :inputName="name"
        :handleChange="handleInputChange"
        :inputClass="inputClass"
        :defaultValue="defaultValue"
        :isClear="isClear"
      />
      <Button
        :value="showSignUpForm ? signUpText : loginFormButton"
        :buttonType="formButtonType"
        :customClass="buttonCustomClass"
        :isDisabled="checkBtnDisabled"
        :handleClick="showSignUpForm ? registerUser : loginUser"
      />
    </form>
    <div class="signup-text-section">
      <span>{{
        !showSignUpForm ? signUpDescription : loginFormDescription
      }}</span>
      <span
        class="sign-up-text"
        @click="
          () => {
            toggleForm(!showSignUpForm);
            clearForm();
          }
        "
        >{{ !showSignUpForm ? signUpText : loginFormButton }}</span
      >
    </div>
    <div v-if="!showSignUpForm">
      <div class="separator-section">
        <p class="or-text">{{ orText }}</p>
      </div>
      <div class="google-section" @click="googleSignIn">
        <GoogleLogo class="google-logo" />
        <Button
          :value="signInWithGoogle"
          :buttonType="formButtonType"
          :customClass="googleBtnClass"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import InoutBox from '../input-box/InputBox.vue';
import Button from '../button/Button.vue';
import GoogleLogo from '../logos/GoogleLogo.vue';
type FormInputValueType = {
  email: string;
  password: string;
};
type inputConfigType = {
  name: string;
  placeholder: string;
  type: string;
  defaultValue: string;
  isClear: boolean;
};
type loginFormType = {
  formTitle: string;
  loginFormButton: string;
  formButtonType: string;
  signUpDescription: string;
  loginFormDescription: string;
  signUpText: string;
  showSignUp: boolean;
  loginFormConfiguration: inputConfigType[];
  inputClass: string;
  buttonCustomClass: string;
  formInputValues: FormInputValueType;
  orText: string;
  signInWithGoogle: string;
  googleBtnClass: string;
};
export default Vue.extend({
  name: 'LoginForm',
  data: (): loginFormType => ({
    formTitle: 'Enter Credentials',
    loginFormButton: 'Login',
    formButtonType: 'primary',
    signUpDescription: `Don't have an account?`,
    loginFormDescription: 'Back to',
    signUpText: 'Sign Up',
    signInWithGoogle: 'Sign in with Google',
    showSignUp: false,
    loginFormConfiguration: [
      {
        name: 'email',
        placeholder: 'Email Id',
        type: 'text',
        defaultValue: '',
        isClear: false,
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        defaultValue: '',
        isClear: false,
      },
    ],
    inputClass: 'login-form-input',
    buttonCustomClass: 'login-form-submit',
    formInputValues: {
      email: '',
      password: '',
    },
    orText: 'Or',
    googleBtnClass: 'google-btn',
  }),
  components: {
    InoutBox,
    Button,
    GoogleLogo,
  },
  methods: {
    handleSubmit(event: Event) {
      event.preventDefault();
    },
    handleInputChange(inputVal: string, inputName: keyof FormInputValueType) {
      this.formInputValues[inputName] = inputVal;
    },
    toggleForm(formState: boolean) {
      this.showSignUp = formState;
    },
    clearForm() {
      this.loginFormConfiguration.forEach((formElement) => {
        formElement.isClear = true;
      });
      Object.keys(this.formInputValues).forEach((formKey) => {
        this.formInputValues[formKey as keyof FormInputValueType] = '';
      });
    },
    registerUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formInputValues.email,
          this.formInputValues.password
        );
    },
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.formInputValues.email,
          this.formInputValues.password
        );
    },
    googleSignIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
  },
  computed: {
    showSignUpForm() {
      return this.showSignUp;
    },
    checkBtnDisabled() {
      return Object.values(this.formInputValues).every(
        (formValue: string) => !formValue
      );
    },
  },
});
</script>
<style lang="scss">
.login-form-container {
  padding: 20px 0;
  .login-form-input {
    width: 90%;
    margin: 10px auto 0;
    padding: 10px 5px;
    box-sizing: border-box;
    color: $blue;
    &:focus {
      border: 1px solid $blue;
      &::placeholder {
        color: $blue;
      }
    }
  }
  .login-form-submit {
    margin: 20px 0;
  }
  .signup-text-section {
    .sign-up-text {
      color: $blue;
      cursor: pointer;
      font-weight: bold;
      font-size: 0.9rem;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .separator-section {
    border-top: 1px solid $grey2;
    margin: 30px 0 20px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    .or-text {
      position: relative;
      top: -8px;
      background: $white;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .google-section {
    border: 1px solid $google-blue;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: 50px;
    width: 240px;
    .google-logo {
      width: 50px;
      cursor: pointer;
    }
    .google-btn {
      background: $google-blue;
      border: none;
      border-radius: 0;
      height: 50px;
      width: 190px;
      &:hover {
        background: $google-blue;
        color: $white;
      }
    }
  }
}
</style>
