import { Prediction } from '@/types/types'

import TwoOutcomes from './predictionsOutcomes/TwoOutcomes/TwoOutcomes'

const Overlays = ({ prediction }: { prediction: Prediction | null }) => {
  if (!prediction) return

  switch (prediction?.outcomes.length) {
    case 2:
      return <TwoOutcomes prediction={prediction} />
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    default:
      return null
  }
}

export default Overlays
