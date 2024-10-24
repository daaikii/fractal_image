import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles['header-wrapper']}>
      <div className={styles['header']}>
        <h1>NewsSite</h1>
        <nav>
          <ul>
            <li><a href="#technology">テクノロジー</a></li>
            <li><a href="">Technology</a></li>
            <li><a href="">Technology</a></li>
            <li><a href="">Technology</a></li>
            <li><a href="">Technology</a></li>
            <li><a href="">お問い合わせ</a></li>
          </ul>
        </nav>
        <a className="header-login">LOGIN</a>
      </div>
    </header>
  )
}