import * as database from "./database";
import { verify } from "./verify";

export async function verifyJob(): Promise<void> {
  console.log(" * verification starting");
  const newStories = database.queryByStatus("new");
  console.log(
    "found new stories: " + newStories.map(({ id }) => id).join(", ")
  );
  for (const newStory of newStories) {
    try {
      const result = await verify(`${newStory.title}. ${newStory.contents}`);
      console.log(`story ${newStory.id} verification result: ${result}`);
      database.updateStatus(newStory.id, result ? "approved" : "rejected");
    } catch (e) {
      console.error(e);
    }
  }
  console.log(" * verification finished");
}
