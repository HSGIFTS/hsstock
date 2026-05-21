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

async function loadProducts() {

  const select = document.getElementById('productSelect')

  const { data } = await supabase
    .from('products')
    .select('*')

  select.innerHTML = ''

  data.forEach(product => {

    select.innerHTML += `
      <option value="${product.id}">
        ${product.name} - Stock: ${product.stock}
      </option>
    `
  })
}

window.makeSale = async function () {

  const productId = document.getElementById('productSelect').value

  const quantity = parseInt(
    document.getElementById('quantity').value
  )

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (quantity > product.stock) {

    message.innerText = 'Not enough stock'

    return
  }

  const total = quantity * product.price

  await supabase
    .from('sales')
    .insert([
      {
        product_id: product.id,
        product_name: product.name,
        quantity,
        total
      }
    ])

  await supabase
    .from('products')
    .update({
      stock: product.stock - quantity
    })
    .eq('id', product.id)

  message.innerText = 'Sale recorded'

  loadProducts()

  loadSales()
}

async function loadSales() {

  const salesList = document.getElementById('salesList')

  const { data } = await supabase
    .from('sales')
    .select('*')
    .order('id', { ascending: false })

  salesList.innerHTML = ''

  data.forEach(sale => {

    salesList.innerHTML += `
      <div class="sale">

        <h3>${sale.product_name}</h3>

        <p>Quantity: ${sale.quantity}</p>

        <p>Total: ${sale.total}</p>

      </div>
    `
  })
}

window.goProducts = function () {

  window.location.href =
    '../products/products.html'
}

loadProducts()

loadSales()