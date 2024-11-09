export default function Testimonials() {
  return (
    <div className="faq_wrapper" id="faq">
      <section className="faq">

        <h2 className="section_title">よくある質問</h2>

        <details className="accordion">
          <summary >プロジェクトの依頼方法は？</summary>
          <div>
            <p>
              プロジェクトの依頼は「お問い合わせ」フォームからご連絡いただくか、お電話で直接お話しすることも可能です。まずはお気軽にご相談ください。
            </p>
          </div>
        </details>

        <details className="accordion">
          <summary >料金はどのように決まりますか？</summary>
          <div>
            <p>
              料金はプロジェクトの内容や規模に応じて異なります。具体的な見積もりをお出しするために、お客様のニーズをお伺いするカウンセリングを行っています。
            </p>
          </div>
        </details>

        <details className="accordion">
          <summary >どのような業界のお客様と取引していますか？</summary>
          <div>
            <p>
              当社は多様な業界のお客様とお取引があります。地元企業からスタートアップ、教育機関、非営利団体まで、幅広いクライアントにサービスを提供しています。
            </p>
          </div>
        </details>

        <details className="accordion">
          <summary >お客様の声はどのように確認できますか？</summary>
          <div>
            <p>
              これまでにご利用いただいたお客様の声は、「お客様の声」セクションにて掲載しています。実際の体験談やフィードバックをぜひご覧ください。</p>
          </div>
        </details>

        <details className="accordion">
          <summary >どのくらいの期間でプロジェクトが完成しますか？</summary>
          <div>
            <p>
              プロジェクトの種類や規模により異なりますが、一般的にはデザイン制作に数週間、ウェブサイト開発には1ヶ月以上の時間をいただくことが多いです。詳細なスケジュールはプロジェクトのご相談時にお伝えします。
            </p>
          </div>
        </details>

      </section>
    </div>
  )
}