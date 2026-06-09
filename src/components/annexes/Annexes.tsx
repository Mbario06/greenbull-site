import { Marquee } from '../Marquee'
import { AnnexIntro } from './AnnexIntro'
import { AnnexTimeline } from './AnnexTimeline'
import { AnnexPositioning } from './AnnexPositioning'
import { AnnexModel } from './AnnexModel'
import { AnnexData } from './AnnexData'
import { AnnexFeasibility } from './AnnexFeasibility'
import { AnnexBenchmark } from './AnnexBenchmark'
import { AnnexRecommendation } from './AnnexRecommendation'
import { Bibliography } from './Bibliography'

/** Zone annexes du dossier : index + sept volets A→G + bibliographie. */
export function Annexes() {
  return (
    <>
      <Marquee text="Annexes du dossier · Sources, données & faisabilité" variant="cream" />
      <AnnexIntro />
      <AnnexTimeline />
      <AnnexPositioning />
      <AnnexModel />
      <AnnexData />
      <AnnexFeasibility />
      <AnnexBenchmark />
      <AnnexRecommendation />
      <Bibliography />
    </>
  )
}
