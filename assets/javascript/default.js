class AJAX_CONNECT {

  constructor (formName, form, arrayFunc) {

    this.name = formName;
    this.form = form;
    this.functions = arrayFunc;

  }

  onValidate () {

    let 
      xhr = new XMLHttpRequest(),
      formData = new FormData(this.form);

    xhr.open('POST', `../includes/${this.name}.php`, true);

    xhr.onload = e => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;

          // console.log(data);

          if(data.includes('Fields')) {

            return this.functions.fields();

          }

          if(data.includes('Firstname')) {

            this.functions.firstname_is_required();

          } else if(data.includes('FirstLetters')) {

            this.functions.firstname_is_invalid();
            
          } else {
            
            this.functions.firstname_is_valid();
            
          }
          
          if(data.includes('Lastname')) {
            
            this.functions.lastname_is_required();
            
          } else if(data.includes('LastLetters')) {
            
            this.functions.lastname_is_invalid();


          } else {
            
            this.functions.lastname_is_valid();

          }

          if(data.includes('Email')) {

            this.functions.email_is_required();
            
          } else if(data.includes('E_Invalid')) {

            this.functions.email_is_invalid();

          } else if(data.includes('Taken')) {
            
            this.functions.email_is_taken();
            
          } else {
            
            this.functions.email_is_valid();

          }

          if(data.includes('Password')) {

            this.functions.password_is_required();
            
          } else if(data.includes('NotMatched')) {

            this.functions.password_is_not_match();

          } else {
            
            this.functions.password_is_valid();

          }

        }
      }
    }

    xhr.send(formData);

  }

  onRegister () {

    let
      xhr = new XMLHttpRequest(),
      formData = new FormData(this.form);
    
    xhr.open('POST', `../includes/${this.name}.php`, true);

    xhr.onload = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;

          if(data.includes('RegisteredSuccessfully')) {
            window.location.href = 'index.php';
          }
        }
      }
    }

    xhr.send(formData);

  }

  onLogin () {

    let
      xhr = new XMLHttpRequest(),
      formData = new FormData(this.form);
    
    xhr.open('POST', `../includes/${this.name}.php`, true);

    xhr.onload = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;

          if(data.includes('Fields')) {

            this.functions.fields();

          }

          if(data.includes('E_Invalid') && data.includes('Password')) {

            this.functions.e_invalid();

          }

          if(data.includes('Wrong')) {

            this.functions.wrong_credentials();

          }

          if(data.includes('notYetRegistered')) {

            this.functions.email_is_not_registered();

          }

          if(data.includes('loggedIn')) {

            window.location.href = 'index.php';

          }

        }
      }
    }

    xhr.send(formData);

  }

}

if(window.location.href.includes('login')) { //////// Login Section
  
  window.onload = () => {
    
    document.title = 'Login | Chat System App'
  
  }

  const
    loginForm = document.querySelector('.form-wrapper .login'),
    loginButton = loginForm.querySelector('.loginButton'),
    passwordEyeToggle = loginForm.querySelector('.label-wrapper .password-wrapper button');


  const allFieldRequired = () => {

    loginForm.querySelectorAll('input').forEach(i => i.classList.add('red'));
    loginForm.querySelectorAll('input').forEach(i => i.classList.remove('orange'));
    loginForm.querySelectorAll('input').forEach(i => i.classList.remove('green'));

    loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.textContent = 'This is required');
    loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.classList.add('show'));
    loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.classList.add('red'));
    loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.classList.remove('orange'));

  }

  const notYetRegistered = () => {

    loginForm['email'].classList.remove('red');
    loginForm['email'].classList.add('orange');
    loginForm['email'].classList.remove('green');

    loginForm['password'].classList.add('red');
    loginForm['password'].classList.remove('orange');
    loginForm['password'].classList.remove('green');

    loginForm.querySelector('.label-wrapper #email').textContent = 'This email is not yet registered';
    loginForm.querySelector('.label-wrapper #email').classList.add('show');
    loginForm.querySelector('.label-wrapper #email').classList.remove('red');
    loginForm.querySelector('.label-wrapper #email').classList.add('orange');

  }

  const E_Invalid = () => {

    loginForm['email'].classList.add('red');
    loginForm['email'].classList.remove('orange');
    loginForm['email'].classList.remove('green');

    loginForm['password'].classList.add('red');
    loginForm['password'].classList.remove('orange');
    loginForm['password'].classList.remove('green');

    loginForm.querySelector('.label-wrapper #email').textContent = 'Email is invalid';
    loginForm.querySelector('.label-wrapper #email').classList.add('show');
    loginForm.querySelector('.label-wrapper #email').classList.add('red');
    loginForm.querySelector('.label-wrapper #email').classList.remove('orange');

  }

  const wrongCredentials = () => {

    loginForm.querySelectorAll('input').forEach(i => i.classList.add('red'));
    loginForm.querySelectorAll('input').forEach(i => i.classList.remove('orange'));
    loginForm.querySelectorAll('input').forEach(i => i.classList.remove('green'));

    loginForm.querySelector('.label-wrapper #email').textContent = 'Wrong Credentials';
    loginForm.querySelector('.label-wrapper #email').classList.add('show');
    loginForm.querySelector('.label-wrapper #email').classList.add('red');
    loginForm.querySelector('.label-wrapper #email').classList.remove('orange');

  }

  const loginValidate = () => {

    const functionObs = {

      fields: allFieldRequired,
      email_is_not_registered: notYetRegistered,
      e_invalid: E_Invalid,
      wrong_credentials: wrongCredentials

    }

    const login = new AJAX_CONNECT(loginForm.id, loginForm, functionObs);
    login.onLogin();

  }

  loginForm.querySelectorAll('input').forEach(i => {

    i.onkeyup = e => {

      loginForm.querySelectorAll('input').forEach(i => i.classList.remove('red'));
      loginForm.querySelectorAll('input').forEach(i => i.classList.remove('orange'));
      loginForm.querySelectorAll('input').forEach(i => i.classList.remove('green'));
  
      loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.textContent = '');
      loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.classList.remove('show'));
      loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.classList.remove('red'));
      loginForm.querySelectorAll('.label-wrapper .message').forEach(s => s.classList.remove('orange'));

      if(e.key === 'Enter') {
  
        loginValidate()
  
      }
  
    }

  })

  passwordEyeToggle.onclick = e => {

    passwordEyeToggle.classList.toggle('open');

    if(passwordEyeToggle.classList.contains('open')) {
      loginForm['password'].type = 'text';
    }
    else {
      loginForm['password'].type = 'password';
    }

  }

  loginButton.onclick = e => {

    loginValidate()

  }

} ///////////////////// Register Section
else {

  window.onload = () => {
    
    document.title = 'Register | Chat System App'
  
  }

  const
    registerForm = document.querySelector('.form-wrapper .register'),
    registerButton = registerForm.querySelector('.registerButton'),
    textInputs = [registerForm['firstname'], registerForm['lastname']],
    passwordEyeToggle = registerForm.querySelector('.label-wrapper .password-wrapper button');

  let 
    char = /[a-zA-Z]/gm,
    errorMessage = 'This is required',
    takenMessage = 'This is already registered',
    successMessage = registerForm.querySelector('.success-message'),
    spans = registerForm.querySelectorAll('.label-wrapper span'),
    firstnameSpan = registerForm.querySelector('.label-wrapper #firstname'),
    lastnameSpan = registerForm.querySelector('.label-wrapper #lastname'),
    emailSpan = registerForm.querySelector('.label-wrapper #email'),
    passwordSpan = registerForm.querySelector('.label-wrapper #password');

  const toDefault = () => {

    registerForm.querySelectorAll('input').forEach(i => {

      i.classList.remove('red');
      i.classList.remove('green');
      i.classList.remove('orange');

    });

    registerForm.querySelectorAll('input').forEach(i => i.value = '');
    setTimeout(() => registerForm.querySelector('small').textContent = '', 10000);

    spans.forEach(s => s.classList.remove('show'));
    spans.forEach(s => s.textContent = '');
    spans.forEach(s => s.classList.remove('red'));
    spans.forEach(s => s.classList.remove('orange'));

  }

  const emailIsTaken = () => {

    registerForm['email'].classList.remove('red');
    registerForm['email'].classList.add('orange');
    registerForm['email'].classList.remove('green');
    emailSpan.classList.add('show');
    emailSpan.textContent = takenMessage;
    emailSpan.classList.remove('red');
    emailSpan.classList.add('orange');

  }

  const fieldsAreRequired = () => {

    registerForm.querySelectorAll('input').forEach(i => i.classList.add('red'));
    registerForm.querySelectorAll('input').forEach(i => i.classList.remove('orange'));
    registerForm.querySelectorAll('input').forEach(i => i.classList.remove('green'));

    spans.forEach(s => s.classList.add('show'));
    spans.forEach(s => s.textContent = errorMessage);
    spans.forEach(s => s.classList.add('red'));
    spans.forEach(s => s.classList.remove('orange'));

  }

  const firstnameIsRequired = () => {

    registerForm['firstname'].classList.add('red');
    registerForm['firstname'].classList.remove('orange');
    registerForm['firstname'].classList.remove('green');

    firstnameSpan.classList.add('show');
    firstnameSpan.textContent = 'Firstname is required';
    firstnameSpan.classList.add('red');
    firstnameSpan.classList.remove('orange');

  }

  const firstNameIsInvalid = () => {

    registerForm['firstname'].classList.add('red');
    registerForm['firstname'].classList.remove('orange');
    registerForm['firstname'].classList.remove('green');

    firstnameSpan.classList.add('show');
    firstnameSpan.textContent = 'Firstname must be letters only';
    firstnameSpan.classList.add('red');
    firstnameSpan.classList.remove('orange');

  }

  const firstnameIsValid = () => {

    registerForm['firstname'].classList.remove('red');
    registerForm['firstname'].classList.remove('orange');
    registerForm['firstname'].classList.add('green');

    firstnameSpan.classList.remove('show');
    firstnameSpan.textContent = '';
    firstnameSpan.classList.remove('red');
    firstnameSpan.classList.remove('orange');

  }

  const lastnameIsRequired = () => {

    registerForm['lastname'].classList.add('red');
    registerForm['lastname'].classList.remove('orange');
    registerForm['lastname'].classList.remove('green');

    lastnameSpan.classList.add('show');
    lastnameSpan.textContent = 'Lastname is required';
    lastnameSpan.classList.add('red');
    lastnameSpan.classList.remove('orange');

  }

  const lastNameIsInvalid = () => {

    registerForm['lastname'].classList.add('red');
    registerForm['lastname'].classList.remove('orange');
    registerForm['lastname'].classList.remove('green');

    lastnameSpan.classList.add('show');
    lastnameSpan.textContent = 'Lastname must be letters only';
    lastnameSpan.classList.add('red');
    lastnameSpan.classList.remove('orange');

  }

  const lastnameIsValid = () => {

    registerForm['lastname'].classList.remove('red');
    registerForm['lastname'].classList.remove('orange');
    registerForm['lastname'].classList.add('green');

    lastnameSpan.classList.remove('show');
    lastnameSpan.textContent = '';
    lastnameSpan.classList.remove('red');
    lastnameSpan.classList.remove('orange');

  }

  const emailIsRequired = () => {

    registerForm['email'].classList.add('red');
    registerForm['email'].classList.remove('orange');
    registerForm['email'].classList.remove('green');

    emailSpan.classList.add('show');
    emailSpan.textContent = 'Email is required';
    emailSpan.classList.add('red');
    emailSpan.classList.remove('orange');

  }

  const emailIsInvalid = () => {

    registerForm['email'].classList.add('red');
    registerForm['email'].classList.remove('orange');
    registerForm['email'].classList.remove('green');

    emailSpan.classList.add('show');
    emailSpan.textContent = 'Email is invalid';
    emailSpan.classList.add('red');
    emailSpan.classList.remove('orange');

  }

  const emailIsValid = () => {

    registerForm['email'].classList.remove('red');
    registerForm['email'].classList.remove('orange');
    registerForm['email'].classList.add('green');

    emailSpan.classList.remove('show');
    emailSpan.textContent = '';
    emailSpan.classList.remove('red');
    emailSpan.classList.remove('orange');

  }

  const passwordIsRequired = () => {

    registerForm['password'].classList.add('red');
    registerForm['password'].classList.remove('orange');
    registerForm['password'].classList.remove('green');

    passwordSpan.classList.add('show');
    passwordSpan.textContent = 'Password is required';
    passwordSpan.classList.add('red');
    passwordSpan.classList.remove('orange');

  }

  const passwordIsNotMatch = () => {

    registerForm['password'].classList.add('red');
    registerForm['password'].classList.remove('orange');
    registerForm['password'].classList.remove('green');

    registerForm['cpassword'].classList.add('red');
    registerForm['cpassword'].classList.remove('orange');
    registerForm['cpassword'].classList.remove('green');

    passwordSpan.classList.add('show');
    passwordSpan.textContent = 'Password is not matched';
    passwordSpan.classList.add('red');
    passwordSpan.classList.remove('orange');

  }

  const passwordIsValid = () => {

    registerForm['password'].classList.remove('red');
    registerForm['password'].classList.remove('orange');
    registerForm['password'].classList.add('green');

    registerForm['cpassword'].classList.remove('red');
    registerForm['cpassword'].classList.remove('orange');
    registerForm['cpassword'].classList.add('green');

    passwordSpan.classList.remove('show');
    passwordSpan.textContent = '';
    passwordSpan.classList.remove('red');
    passwordSpan.classList.remove('orange');

  }

  const registerSuccess = () => {
    
    const register = new AJAX_CONNECT('register', registerForm);
    register.onRegister();
    registerForm.querySelector('a').style.display = 'none';
    successMessage.textContent = 'Registered Successfully!';

  }

  const errorRegister = () => {

    registerForm.querySelectorAll('input').forEach(i => i.readOnly = false);
    registerButton.disabled = false;

  }

  const registerValidate = () => {

    const functionObjects = {

      fields: fieldsAreRequired,
      firstname_is_required: firstnameIsRequired,
      firstname_is_invalid: firstNameIsInvalid,
      firstname_is_valid: firstnameIsValid,
      lastname_is_required: lastnameIsRequired,
      lastname_is_invalid: lastNameIsInvalid,
      lastname_is_valid: lastnameIsValid,
      email_is_required: emailIsRequired,
      email_is_invalid: emailIsInvalid,
      email_is_taken: emailIsTaken,
      email_is_valid: emailIsValid,
      password_is_required: passwordIsRequired,
      password_is_not_match: passwordIsNotMatch,
      password_is_valid: passwordIsValid,
  
    }

    const register = new AJAX_CONNECT('register-validate', registerForm, functionObjects);
    register.onValidate();

    setTimeout(() => {

      if
      (
        registerForm['firstname'].classList.contains('green') &&
        registerForm['lastname'].classList.contains('green') &&
        registerForm['email'].classList.contains('green') &&
        registerForm['password'].classList.contains('green') &&
        registerForm['cpassword'].classList.contains('green')
      )
      {
        
        registerSuccess();
        
      }
      else {
        
        return errorRegister();

      }

    }, 2000);

  }

  textInputs.forEach(input => {

    input.onkeypress = e => {

      if(!e.key.match(char)) {
        return e.preventDefault();
      }

    }

  })

  registerForm.querySelectorAll('input').forEach(input => {

    input.onkeyup = e => {

      registerForm.querySelectorAll('input').forEach(i => i.classList.remove('red'));
      registerForm.querySelectorAll('input').forEach(i => i.classList.remove('orange'));
      registerForm.querySelectorAll('input').forEach(i => i.classList.remove('green'));

      spans.forEach(s => s.classList.remove('show'));
      spans.forEach(s => s.textContent = '');
      spans.forEach(s => s.classList.remove('red'));
      spans.forEach(s => s.classList.remove('orange'));

      if(e.key === 'Enter') {

        registerForm.querySelectorAll('input').forEach(i => i.readOnly = true);
        registerButton.disabled = true;

        registerValidate();

      }

    }
  })

  passwordEyeToggle.onclick = e => {

    passwordEyeToggle.classList.toggle('open');

    if(passwordEyeToggle.classList.contains('open')) {
      registerForm['password'].type = 'text';
      registerForm['cpassword'].type = 'text';
    }
    else {
      registerForm['password'].type = 'password';
      registerForm['cpassword'].type = 'password';
    }

  }

  registerButton.onclick = e => {

    registerForm.querySelectorAll('input').forEach(i => i.readOnly = true);
    registerButton.disabled = true;

    registerValidate();

  }

}