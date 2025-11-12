interface RunnableItem {
  runnableId: string;
  hasRun: boolean;
  name: string;
  _id: string;
}

export const mapRunSessionItems = (runnables: RunnableItem[]) => {
  console.log(runnables)
  let foundFirstUnrun = false;

  return runnables.map((runnable) => {
    let status = "pendiente...";

    if (runnable.hasRun) {
      status = "Terminado";
    } else if (!foundFirstUnrun) {
      status = "En progreso...";
      foundFirstUnrun = true;
    }

    return {
      runnableId: runnable.runnableId,
      status,
      name: runnable.name,
      message: {}
    };
  });
};
