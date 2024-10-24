import styles from "./technology.module.css"

export default function Technology() {
  return (
    <section className='section' id="technology">
      <h2 className='section-title'>テクノロジー</h2>
      <ul className={styles['technology-grid']}>
        <li className={styles['technology-grid-item']}>
          <h3>自動運転技術が進化</h3>
          <p>最新の自動運転車が発表され、交通事故を減らすための新しいセンサー技術が搭載されました。この技術は、車両が周囲の状況をリアルタイムで把握し、安全な運転を実現します。</p>
        </li>

        <li className={styles['technology-grid-item']}>
          <h3>クラウドコンピューティングの新時代</h3>
          <p>クラウドサービスプロバイダーが新しいデータ管理ソリューションを発表しました。これにより、企業はデータの保存とアクセスがより効率的になり、コスト削減が期待されます。</p>
        </li>

        <li className={styles['technology-grid-item']}>
          <h3>量子コンピュータの実用化が近づく</h3>
          <p>研究者たちが量子コンピュータの性能向上に成功し、複雑な問題を短時間で解決できる可能性が示されました。この進展は、金融や医療など多くの分野に影響を与えるでしょう。</p>
        </li>

        <li className={styles['technology-grid-item']}>
          <h3>AR技術が教育に革命をもたらす</h3>
          <p>拡張現実（AR）技術を利用した新しい教育プログラムが導入され、生徒たちが実際の体験を通じて学ぶ機会が増えています。このプログラムは、難解な概念を視覚化することで理解を深めます。</p>
        </li>
      </ul>
    </section >
  )
}