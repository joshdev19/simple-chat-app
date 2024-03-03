<?php include_once 'partials/__default.php'; ?>

  <div class="form-wrapper">
    <form class="form register" id="register">
      <small class="success-message"></small>
      <h2>Register</h2>
      <a href="login.php">Already have an account? </a>
      <div class="label-wrapper">
        <input type="text" name="firstname" placeholder="Firstname...">
        <span class="message" id="firstname"></span>
      </div>
      <div class="label-wrapper">
        <input type="text" name="lastname" placeholder="Lastname...">
        <span class="message" id="lastname"></span>
      </div>
      <div class="label-wrapper">
        <input type="email" name="email" placeholder="Email...">
        <span class="message" id="email"></span>
      </div>
      <div class="label-wrapper">
        <div class="password-wrapper">
          <input type="password" name="password" placeholder="Password...">
          <button type="button"></button>
        </div>
        <span class="message" id="password"></span>
      </div>
      <div class="label-wrapper">
        <input type="password" name="cpassword" placeholder="Confirm Password...">
        <span class="message" id="password"></span>
      </div>
      <button class="registerButton" type="button">REGISTER</button>
    </form>
  </div>

</body>
</html>