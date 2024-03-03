if(window.location.href.includes('index')) {
  
  window.onload = () => {
    
    document.title = 'Users | Chat System App'
  
  }

  const
  logoutButton = document.querySelector('.logoutButton'),
  contactWrapper = document.querySelector('.contacts-wrapper');

  const updateUserStatus = setInterval( async () => {

    await fetch('../includes/update-user-status.php');

  }, 3000)

  const displayContactsTimer = setInterval(() => {
    
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', `../includes/get-users.php`, true);
    
    xhr.onload = e => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;
          
          contactWrapper.innerHTML = data;
          
        }
      }
    }
    
    xhr.send(null);
    
  }, 500);;
  
  logoutButton.onclick = e => {

    let xhr = new XMLHttpRequest();

    xhr.open('POST', `../includes/logout.php`, true);

    xhr.onprogress = () => {

      clearInterval(displayContactsTimer);

    }

    xhr.onload = e => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;

          if(data === 'loggedOut') {
            window.location.href = 'login.php';
          }
          
        }
      }
    }

    xhr.send(null);

  }

}

if(window.location.href.includes('chat')) {

  const
    backButton = document.querySelector('.back'),
    input_status = document.querySelector('.chat-wrapper .input_status'),
    status = document.querySelector('.chat-wrapper .status'),
    messagesWrapper = document.querySelector('.messages-wrapper'),
    form = document.querySelector('.send-wrapper form'),
    textField = form.querySelector('textarea'),
    sendButton = form.querySelector('.sendButton');

    let num = [];

  window.onload = () => {
    
    document.title = 'Chat | Chat System App'
  
  }

  const updateUserStatus = setInterval( async () => {

    await fetch('../includes/update-user-status.php');

  }, 3000)

  const checkStatus = setInterval( async () => {

    const request =  await fetch('../includes/check-user-status.php', {
      method: 'POST',
      body: JSON.stringify({id: input_status.value}),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });

    const response = await request.text();

    status.innerHTML = response;

  }, 10000)

  const displayMessagesTimer = setInterval(displayMessage = () => {

    let xhr = new XMLHttpRequest();

    xhr.open('post', '../includes/get-messages.php', true);

    xhr.onload = e => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;

          messagesWrapper.innerHTML = data;
          console.log('.');
          if(messagesWrapper.children.length > 0) {
            setTimeout(() => messagesWrapper.scrollBy(0, 1000, {behavior:'smooth'}), 700);
          }else {
            setTimeout(() => messagesWrapper.scrollBy(0, 1000, {behavior:'smooth'}), 700);
          }
          
        }
      }
    }

    xhr.send(null);

  },500);

  backButton.onclick = e => {

    clearInterval(displayMessagesTimer);
    window.location.href = `index.php`;

  }

  sendButton.onclick = e => {
    sendButton.disabled = true;
    
    if(textField.value.length === 0) {
      sendButton.disabled = false;
      return false;
    }

    let 
      xhr = new XMLHttpRequest(),
      formData = new FormData(form);

    xhr.open('post', '../includes/insert-message.php', true);

    xhr.onload = e => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let data = xhr.response;
          console.log('.')
          if(data === 'sent') {
            textField.value = '';
            sendButton.disabled = false;
            
            messagesWrapper.lastChild.scrollIntoView( {
              behavior: 'smooth'
            })
          }

        }
      }
    }

    xhr.send(formData);

  }
}
