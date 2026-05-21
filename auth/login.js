import { supabase } from '../shared/supabase.js'

const message = document.getElementById('message')

window.signUp = async function () {

  const email = document.getElementById('email').value

  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    message.innerText = error.message
  } else {
    message.innerText = 'Signup successful'
  }
}

window.login = async function () {

  const email = document.getElementById('email').value

  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    message.innerText = error.message
  } else {

    window.location.href = '../products/products.html'
  }
} 