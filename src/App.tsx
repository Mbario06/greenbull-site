import './styles/sections.css'
import './styles/annexes.css'
import './styles/insights.css'
import { CanStage } from './canvas/CanStage'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Promises } from './components/Promises'
import { Interlude } from './components/Interlude'
import { ReturnRecharge } from './components/ReturnRecharge'
import { Rewards } from './components/Rewards'
import { Impact } from './components/Impact'
import { Pricing } from './components/Pricing'
import { Gallery } from './components/Gallery'
import { FinalCta } from './components/FinalCta'
import { MarketFigures } from './components/insights/MarketFigures'
import { ReturnProof } from './components/insights/ReturnProof'
import { Profitability } from './components/insights/Profitability'
import { Limits } from './components/insights/Limits'
import { Annexes } from './components/annexes/Annexes'
import { Footer } from './components/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useSmoothScroll()
  useReveal()

  return (
    <>
      <CanStage />
      <Nav />

      <main>
        <Hero />
        <Marquee text="Cette canette vaut encore quelque chose." />
        <Promises />

        <Interlude
          eyebrow="Return Edition"
          title="Une silhouette familière. Une promesse nouvelle."
          note="Tourne autour d’elle — la même icône, une autre fin de vie."
        />

        <ReturnRecharge />
        <Rewards />
        <ReturnProof />

        <Interlude
          eyebrow="La canette parle"
          title="« Je ne suis pas un déchet. Je suis une future canette. »"
          align="right"
        />

        <Impact />
        <MarketFigures />
        <Pricing />
        <Profitability />
        <Gallery />
        <Limits />
        <FinalCta />
        <Annexes />
      </main>

      <Footer />
    </>
  )
}
