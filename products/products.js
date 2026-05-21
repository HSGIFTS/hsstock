import { supabase } from '../shared/supabase.js'

const message = document.getElementById('message')

async function checkUser() {

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    window.location.href = '../auth/login.html'
  }
}

checkUser()

window.addProduct = async function () {

  const name = document.getElementById('productName').value

  const price = document.getElementById('productPrice').value

  const stock = document.getElementById('productStock').value

  const { error } = await supabase
    .from('products')
    .insert([
      {
        name,
        price,
        stock
      }
    ])

  if (error) {
    message.innerText = error.message
  } else {

    message.innerText = 'Product added successfully'

    loadProducts()
  }
}

window.deleteProduct = async function (id) {

  const confirmed = confirm(
    'Delete this product?'
  )

  if (!confirmed) return

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {

    message.innerText = error.message

  } else {

    message.innerText =
      'Product deleted'

    loadProducts()
  }
}

window.editProduct = async function (
  id,
  oldName,
  oldPrice,
  oldStock
) {

  const name = prompt(
    'Product Name:',
    oldName
  )

  const price = prompt(
    'Price:',
    oldPrice
  )

  const stock = prompt(
    'Stock:',
    oldStock
  )

  if (!name || !price || !stock) return

  const { error } = await supabase
    .from('products')
    .update({
      name,
      price,
      stock
    })
    .eq('id', id)

  if (error) {

    message.innerText = error.message

  } else {

    message.innerText =
      'Product updated'

    loadProducts()
  }
}

async function loadProducts() {

  const productList = document.getElementById('productList')

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    productList.innerHTML = 'Failed to load products'
    return
  }

  productList.innerHTML = ''

  data.forEach(product => {

    productList.innerHTML += `
  <div class="product">

    <h3>${product.name}</h3>

    <p>Price: ${product.price}</p>

    <p>Stock: ${product.stock}</p>

    <button onclick="editProduct(
      ${product.id},
      '${product.name}',
      ${product.price},
      ${product.stock}
    )">
      Edit
    </button>

    <button onclick="deleteProduct(
      ${product.id}
    )">
      Delete
    </button>

  </div>
`
  })
}

window.logout = async function () {

  await supabase.auth.signOut()

  window.location.href = '../auth/login.html'
}

window.goSales = function () {

  window.location.href =
    '../sales/sales.html'
}

window.goDashboard = function () {

  window.location.href =
    '../dashboard/dashboard.html'
}

loadProducts()