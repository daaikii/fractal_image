import { useState, useEffect, useCallback, useRef } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

import { CanvasContextType, useCanvas } from "../store/CanvasProvider";



export default function Technology() {
  const { canvas } = useCanvas() as CanvasContextType
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (duration: number) => {
    if (isChanging) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsChanging(true)
    canvas?.changeImage(duration)
    const slider = document.getElementById("slider")
    if (slider) {
      const items = slider.children; // スライダー内のすべてのアイテムを取得
      items[currentIndex].classList.remove("display")
      const newIndex = (currentIndex + duration + items.length) % items.length; // 新しいインデックスを計算
      items[newIndex].classList.add("display")
      setCurrentIndex(newIndex); // インデックスを更新
    }
    setTimeout(() => {
      setIsChanging(false);
      startAutoScroll()
    }, 1000)
  }

  const startAutoScroll = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      handleClick(1)
    }, 10000)
  }, [handleClick])

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [startAutoScroll])

  return (
    <section className='tec_wrapper' id="technology">

      <div
        className="tec_toggle_prev"
        onClick={() => handleClick(-1)}
      >
        <button
          aria-label="前の記事にスライド"
          className="tec_toggle_prev_button"
        >
          <FaArrowLeftLong size="4rem" />
        </button>
      </div>

      <div className="tec">
        <h2 className='section_title'>テクノロジー</h2>
        <ul className="tec_slider" id="slider">
          <li className="tec_slider_item display">
            <h3>自動運転技術が進化</h3>
            <p>最新の自動運転車が発表され、交通事故を減らすための新しいセンサー技術が搭載されました。この技術は、車両が周囲の状況をリアルタイムで把握し、安全な運転を実現します。</p>
          </li>

          <li className="tec_slider_item">
            <h3>クラウドコンピューティングの新時代</h3>
            <p>クラウドサービスプロバイダーが新しいデータ管理ソリューションを発表しました。これにより、企業はデータの保存とアクセスがより効率的になり、コスト削減が期待されます。</p>
          </li>

          <li className="tec_slider_item">
            <h3>量子コンピュータの実用化が近づく</h3>
            <p>研究者たちが量子コンピュータの性能向上に成功し、複雑な問題を短時間で解決できる可能性が示されました。この進展は、金融や医療など多くの分野に影響を与えるでしょう。</p>
          </li>

          <li className="tec_slider_item">
            <h3>AR技術が教育に革命をもたらす</h3>
            <p>拡張現実（AR）技術を利用した新しい教育プログラムが導入され、生徒たちが実際の体験を通じて学ぶ機会が増えています。このプログラムは、難解な概念を視覚化することで理解を深めます。</p>
          </li>
        </ul>
      </div>

      <div
        className="tec_toggle_next"
        onClick={() => handleClick(1)}
      >
        <button
          aria-label="後の記事にスライド"
          className="tec_toggle_next_button"
        >
          <FaArrowRightLong size="4rem" />
        </button>
      </div>

    </section >
  )
}