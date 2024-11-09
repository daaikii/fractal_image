import { useEffect, useRef } from "react"
import clsx from "clsx"

import { ModalContextType, useModal } from "../store/ModalProvider"
import { NavContextType, useNav } from "../store/NavigationProvider"


export default function Header() {
  const { setModalDisplay } = useModal() as ModalContextType
  const headerRef = useRef<HTMLElement | null>(null)
  const { navDisplay, setNavDisplay } = useNav() as NavContextType

  useEffect(() => {
    function wheelEvent(e: Event) {
      if (!headerRef.current) return
      const scroll = window.scrollY;
      const scrollThreshold = 50;
      if (scroll > scrollThreshold) {
        headerRef.current.classList.add("scrolled");
      } else {
        headerRef.current.classList.remove("scrolled");
      }
    }
    document.addEventListener("scroll", wheelEvent)
  }, [])

  return (
    <header className="header" ref={headerRef}>
      <h1 className="header_title">
        <a href="#about">InspireWorks</a>
      </h1>

      {/* <div className="nav-background"> */}
      <nav className={clsx("header_nav", navDisplay && "display")}>
        <ul>
          <li><a href="#news">ニュース</a></li>
          <li><a href="#technology">実績・事例紹介</a></li>
          <li><a href="#faq">よくある質問</a></li>
          <li><a href="#info" onClick={() => setModalDisplay(true)}>お問い合わせ</a></li>
        </ul>
      </nav>

      <div
        className={clsx("header_nav_toggle", navDisplay && "display")}
        aria-label="header navigation toggle"
        role="button"
        aria-expanded={navDisplay}
        onClick={() => setNavDisplay(state => !state)}
      >
        <span className="header_nav_toggle_bar"></span>
      </div>
      {/* </div> */}
    </header>
  )
}
