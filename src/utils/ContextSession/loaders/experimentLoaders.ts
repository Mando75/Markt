import { Experiment } from "../../../entity/Experiment";
import * as DataLoader from "dataloader";
import { oneToManyMapper, oneToOneMapper } from "./index";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";
import { ExperimentSession } from "../../../entity/ExperimentSession";

export const experimentLoaders = {
  ex: Experiment.getDataloader(),
  // SCENARIO
  exScenario: new DataLoader(async (ids: string[]) => {
    const experiments = await Experiment.findByIds(ids, {
      select: ["id", "scenario"],
      relations: ["scenario"],
      cache: true
    });
    const scenarios = experiments.map(e => e.scenario);
    return oneToOneMapper(scenarios, ids);
  }),
  // GUIDE
  exGuide: new DataLoader(async (ids: string[]) => {
    const experiments = await Experiment.findByIds(ids, {
      select: ["id", "guide"],
      relations: ["guide"],
      cache: true
    });
    console.log("Getting guide yo");
    const guides = await Promise.all(experiments.map(e => e.guide));
    console.log("got guides yo");
    return oneToOneMapper(guides, ids);
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
};
