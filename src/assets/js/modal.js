function _createFooter(buttons = []) {
  if (buttons.length === 0) return false

  const wrap = document.createElement("div")
  wrap.classList.add("tmodal_footer")

  buttons.forEach((button) => {
    const $btn = document.createElement("button")
    $btn.classList.add("btn")
    $btn.classList.add(`btn-${button.type || "secondary"}`)
    $btn.innerText = button.text
    $btn.onclick = button.handler
    wrap.appendChild($btn)
  })

  return wrap
}

function _createModal(options) {
  const modal = document.createElement("div")
  modal.classList.add("tmodal")

  const html = `
    <div class="tmodal_overlay " data-type="close">
        <div class="tmodal_window">
            <div class="tmodal_header">
                <span class="title">${options.title}</span>
                ${
                  options.closable
                    ? '<span data-type="close" class="close">X</span>'
                    : ""
                }
            </div>
            <div class="tmodal_body" data-content='true'>
                ${options.content || "Title"}
            </div>
        </div>
    </div>
  `

  const footer = _createFooter(options.footerButtons)

  modal.insertAdjacentHTML("afterbegin", html)
  document.body.appendChild(modal)
  modal.querySelector(".tmodal_window").appendChild(footer)
  return modal
}

export function Modal(options) {
  const ANIMATION_SPEED = 400
  let closing = false
  const $modal = _createModal(options)
  let destroyed = false

  const config = {
    open() {
      if (destroyed) {
        console.log("Modal destroyed")
      }

      !closing && $modal.classList.add("open")
    },
    close() {
      closing = true
      $modal.classList.remove("open")
      $modal.classList.add("hide")
      setInterval(() => {
        closing = false
        if (typeof options.onClose === "function") {
          options.onClose()
        }
        $modal.classList.remove("hide")
      }, ANIMATION_SPEED)
    },
  }

  const listener = (e) =>
    e.target.dataset.type == "close" ? config.close() : false

  $modal.addEventListener("click", listener)

  return Object.assign(config, {
    destroy() {
      destroyed = true
      $modal.remove()
      $modal.removeEventListener("click", listener)
    },
    setContent(html) {
      document.querySelector('[data-content="true"').innerHTML = html
    },
  })
}
