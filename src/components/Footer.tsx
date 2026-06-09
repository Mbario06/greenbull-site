export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__word">GreenBull</span>
          <span className="footer__claim">Bois-la. Ramène-la. Gagne.</span>
        </div>

        <nav className="footer__nav" aria-label="Pied de page">
          <a href="#concept">Le concept</a>
          <a href="#return">Return &amp; Recharge</a>
          <a href="#rewards">Récompenses</a>
          <a href="#impact">Impact</a>
          <a href="#pricing">Prix</a>
          <a href="#annexes">Annexes</a>
        </nav>

        <div className="footer__credits">
          <p className="footer__line">
            Projet pédagogique — EDHEC&nbsp;BBA · Principes du Marketing ·
            Pr.&nbsp;S.&nbsp;Ruaud · 2025–2026.
          </p>
          <p className="footer__line">
            Groupe : Sasha&nbsp;Blum · Mylan&nbsp;Debray · Eliot&nbsp;Guiné ·
            Jean-Valère&nbsp;Vindex-Compper.
          </p>
          <p className="footer__disclaimer">
            Concept étudiant — extension de gamme fictive. « Red Bull » et son
            logo sont cités à titre strictement académique, sans lien commercial.
          </p>
        </div>
      </div>
    </footer>
  )
}
