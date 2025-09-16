type StoryStatus = "new" | "approved" | "rejected";
type Story = {
  id: number;
  title: string;
  contents: string;
  status: StoryStatus;
};

function cloneStory(story: Story): Story {
  return { ...story };
}

const STORIES: Story[] = [];

export function add(title: string, contents: string): Story {
  const story: Story = {
    id: STORIES.length + 1,
    title,
    contents,
    status: "new",
  };
  STORIES.push(story);
  return cloneStory(story);
}

export function queryAll(): Story[] {
  return STORIES.map(cloneStory);
}

export function queryByStatus(status: StoryStatus): Story[] {
  return STORIES.filter((story) => story.status === status).map(cloneStory);
}

export function updateStatus(id: number, newStatus: StoryStatus): Story {
  const story = STORIES.find((story) => story.id === id);
  if (!story) {
    throw new Error(`story ${id} not found`);
  }
  story.status = newStatus;
  return cloneStory(story);
}
