import { IconCheck, IconCross } from '../icons'

interface Bmk {
  name: string
  val: number
}

const BMK: Bmk[] = [
  { name: 'Allemagne · Pfand', val: 98 },
  { name: 'Norvège · Infinitum', val: 92 },
  { name: 'Objectif UE · 2029', val: 90 },
]

const REALISTE = [
  'Programme de retour récompensé : QR + points / coupon',
  'Borne, bac identifié ou RVM partenaire (collecte réelle)',
  'Lancement en pilote : GMS, campus, festivals',
  'Différenciation, fidélisation, image, trafic retail',
]

const RISQUE = [
  'Créer seul une « vraie consigne » nationale',
  'Logistique, coût des récompenses, maintenance',
  'Fraude et stockage sous-estimés',
  'Récompense trop faible → le consommateur jette',
]

export function ReturnProof() {
  return (
    <section className="section panel panel--soft" id="realiste">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">Offre · modèle Return</p>
          <h2 className="section__title">Return : réaliste &amp; progressif.</h2>
          <p className="section__lead">
            Les systèmes de retour atteignent déjà 90 %+ là où ils existent.
            GreenBull ne réinvente pas la consigne — il la rend désirable.
          </p>
        </header>

        <div className="proof">
          <p className="proof__verdict reveal">
            <span className="proof__verdict-tag">Verdict</span>
            GreenBull Return ne remplace pas la consigne : il rend le retour{' '}
            <strong>désirable, mesurable et fidélisant</strong>. Le retour est
            mesuré par KPI avant toute généralisation.
          </p>

          <div className="reveal">
            <p className="bmk__label">Ce que montrent les marchés qui l’ont fait</p>
            <div className="bmk" role="img" aria-label="Taux de retour atteints : Allemagne 98 %, Norvège 92 %, objectif UE 2029 90 %.">
              {BMK.map((b) => (
                <div className="bmk__row" key={b.name}>
                  <span className="bmk__name">{b.name}</span>
                  <span className="bmk__val tabular">{b.val}&nbsp;%</span>
                  <span className="bmk__track">
                    <span className="bmk__bar" style={{ width: `${b.val}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="balance">
          <div className="balance__col balance__col--ok reveal">
            <p className="balance__head">Réaliste &amp; progressif</p>
            <ul className="balance__list">
              {REALISTE.map((r) => (
                <li key={r}>
                  <IconCheck size={17} className="balance__ic" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="balance__col balance__col--risk reveal">
            <p className="balance__head">À maîtriser</p>
            <ul className="balance__list">
              {RISQUE.map((r) => (
                <li key={r}>
                  <IconCross size={17} className="balance__ic" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="src-note reveal">
          Sources : TOMRA (Allemagne, Norvège) ; Re-turn (Irlande) ; Citeo ReUse ;
          benchmarks DRS Europe — détail en annexes E &amp; F.
        </p>
      </div>
    </section>
  )
}
