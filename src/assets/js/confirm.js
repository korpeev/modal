import { Modal } from "./modal"

export function Fconfirm(options) {
  return new Promise((resolve, reject) => {
    const modal = new Modal({
      title: options.title,
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {
          type: "primary",
          text: "Отмена",
          handler() {
            modal.close()
            reject()
          },
        },
        {
          type: "danger",
          text: "Удалить",
          handler() {
            modal.close()
            resolve()
          },
        },
      ],
    })
    setTimeout(() => modal.open(), 100)
  })
}
