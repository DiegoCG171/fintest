interface RunnableItem {
  runnableId: string;
  hasRun: boolean;
  name: string;
  _id: string;
}

export const mapRunSessionItems = (runnables: RunnableItem[]) => {
  return runnables.map((runnable, i) => ({
    runnableId: runnable.runnableId,
    status: i === 0 ? "En progreso..." : "pendiente...",
    name: runnable.name,
    message: {}
  }));
};
