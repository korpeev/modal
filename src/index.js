import "./assets/scss/main.scss"
import "../node_modules/bootstrap/scss/bootstrap.scss"
import "normalize.css"
import { Modal } from "./assets/js/modal"
import { Fconfirm } from "./assets/js/confirm"

let fruits = [
  { id: 1, title: "Банан", price: 50, src: "./assets/img/img.jpg" },
  { id: 2, title: "Ананас", price: 60, src: "./assets/img/image3.jpg" },
  { id: 3, title: "Апельсин", price: 40, src: "./assets/img/image2.jpg" },
]

const toHtml = (fruit) => {
  return `
    
      <div class="catalog-fruits">
          <img src=${fruit.src} alt="" />
        <div class="catalog-descr" >
          <span class="catalog-title">${fruit.title}</span>
          <span class="catalog-prices">${fruit.price}</span>
          <button class=" btn btn-primary" data-btn='price' data-id="${fruit.id}">Показать цены</button>
          <button style="margin-top: 15px" class="btn btn-danger" data-btn='remove' data-id="${fruit.id}">Удалить</button>
        </div>
      </div>

    `
}

function render() {
  const html = fruits.map(toHtml).join("")
  document.querySelector(".catalog-items").innerHTML = html
}

render()

const priceModal = new Modal({
  title: "Цена на товар",
  closable: true,
  footerButtons: [
    {
      type: "secondary",
      text: "Закрыть",
      handler() {
        priceModal.close()
      },
    },
  ],
})

document.addEventListener("click", (e) => {
  const id = +e.target.dataset.id
  const fruit = fruits.find((f) => f.id === id)
  const btnType = e.target.dataset.btn
  if (btnType === "price") {
    priceModal.open()
    priceModal.setContent(
      `<p>Цена на <strong>${fruit.title}</strong>: ${fruit.price}</p>`
    )
  } else if (btnType === "remove") {
    Fconfirm({
      title: "Вы точно хотите удалить?",
      content: `<p>Вы удаляете <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id)
        render()
      })
      .catch(() => {
        console.log("Cancel")
      })
  }
})

window.priceModal = priceModal
