<?php include_once 'partials/__default.php'; ?>

  <div class="form-wrapper">
    <form class="form login" id="login">
      <h2>Login</h2>
      <a href="register.php">Don't have an account yet? </a>
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
      <button class="loginButton" type="button">LOGIN</button>
    </form>
  </div>

</body>
</html>