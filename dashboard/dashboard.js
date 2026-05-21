import { supabase } from '../shared/supabase.js'

async function checkUser() {

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    window.location.href =
      '../auth/login.html'
  }
}

checkUser()

async function loadDashboard() {

  // PRODUCTS

  const { data: products } =
    await supabase
      .from('products')
      .select('*')

  document.getElementById(
    'totalProducts'
  ).innerText = products.length

  // TOTAL STOCK

  let stockTotal = 0

  products.forEach(product => {
    stockTotal += product.stock
  })

  document.getElementById(
    'totalStock'
  ).innerText = stockTotal

  // LOW STOCK

  const lowStock =
    document.getElementById('lowStock')

  lowStock.innerHTML = ''

  products.forEach(product => {

    if (product.stock <= 5) {

      lowStock.innerHTML += `
        <p>
          ${product.name}
          (${product.stock})
        </p>
      `
    }
  })

  // SALES

  const { data: sales } =
    await supabase
      .from('sales')
      .select('*')

  document.getElementById(
    'salesCount'
  ).innerText = sales.length

  let salesTotal = 0

  sales.forEach(sale => {
    salesTotal += sale.total
  })

  document.getElementById(
    'totalSales'
  ).innerText = salesTotal
}

window.goProducts = function () {

  window.location.href =
    '../products/products.html'
}

window.goSales = function () {

  window.location.href =
    '../sales/sales.html'
}

loadDashboard()