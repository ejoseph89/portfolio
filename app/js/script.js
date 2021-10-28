const form = document.querySelector('form')
const inputBtn = document.querySelector('input[type=submit]')
const name = document.getElementById('name')
const emailAddress = document.getElementById('email')
const textArea = document.getElementById('textarea')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('submit clicked')
  checkInputs()
})

function checkInputs() {
  const nameValue = name.value.trim()
  const emailValue = email.value.trim()

  if(nameValue == '') {
    document.querySelector('.fn__error').classList.add('show')
    document.querySelector('.fn__normal').classList.add('hide')
    document.querySelector('.fn__error--input').classList.add('show')
  }
  
  function emailCheck(email) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      document.querySelector('.em__error').classList.add('show')
      document.querySelector('.em__normal').classList.add('hide')
      const errormsg = emailValue
      
      document.querySelector('.em__error--input').value = errormsg
      document.querySelector('.em__error--input').classList.add('show')
    }
  }
  emailCheck(emailValue)
  

  name.value = ''
  email.value = ''
  textArea.value = ''



}