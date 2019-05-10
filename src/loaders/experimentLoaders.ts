import { Experiment } from "../entity/Experiment";
import * as DataLoader from "dataloader";
import { oneToManyMapper, oneToOneMapper } from "./index";
import { ExperimentPlayer } from "../entity/ExperimentPlayer";
import { ExperimentSession } from "../entity/ExperimentSession";

export const experimentLoaders = () => ({
  ex: Experiment.getDataloader(),
  // SCENARIO
  exScenario: new DataLoader(async (ids: string[]) => {
    const experiments = await Experiment.findByIds(ids, {
      select: ["id", "scenario"],
      relations: ["scenario"],
      cache: true
    });
    return oneToOneMapper(experiments, ids).map(
      experiment => experiment.scenario
    );
  }),
  // GUIDE
  exGuide: new DataLoader(async (ids: string[]) => {
    const experiments = await Experiment.findByIds(ids, {
      select: ["id", "guide"],
      relations: ["guide"],
      cache: true
    });
    return oneToOneMapper(experiments, ids).map(experiment => experiment.guide);
  }),
  // Experiment Players
  exPlayers: new DataLoader(async (ids: string[]) => {
    const experimentPlayers = await ExperimentPlayer.find({
      where: { experiment: ids },
      cache: true
    });
    return oneToManyMapper(experimentPlayers, ids);
  }),
  // Sessions
  exSessions: new DataLoader(async (ids: string[]) => {
    const experimentSessions = await ExperimentSession.find({
      where: { experiment: ids },
      cache: true
    });
    return oneToManyMapper(experimentSessions, ids);
  })
});
