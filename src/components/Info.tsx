import clsx from "clsx"

import { ModalContextType, useModal } from "../store/ModalProvider"


export default function Info() {
  const { modalDisplay, setModalDisplay } = useModal() as ModalContextType
  return (
    <div className={clsx("info_wrapper", modalDisplay && "display")}>
      <form className="info">
        <div className="info_bar">
          <div
            className="info_toggle"
            onClick={() => setModalDisplay(false)}
            role="button"
            aria-label="お問い合わせフォームを閉じる"
          >
          </div>
        </div>
        <label htmlFor="name">name</label>
        <input id="name" type="text" />

        <label htmlFor="detail">detail</label>
        <textarea id="detail" />

        <button type="submit" onClick={() => setModalDisplay(false)}>submit</button>
      </form>
    </div>
  )
}