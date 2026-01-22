interface RunnableItem {
  runnableId: string;
  hasRun: boolean;
  name: string;
  _id: string;
}

export interface RunnableToExecuteItem {
  messageId: string;
  message: any;
  caseId: string;
  status: string;
}

export const mapRunSessionItems = (
  runnables: RunnableItem[],
  runnableToExecute?: RunnableToExecuteItem[]
) => {
  let foundFirstUnrun = false;

  return runnables.map((runnable) => {
    let status = "Pendiente...";

    const toExecute = runnableToExecute?.find(
      r => r.caseId === runnable.runnableId
    );

    console.log(toExecute);

    if (toExecute) {
      status = toExecute.status;
    } else if (runnable.hasRun) {
      status = "Terminado";
    } else if (!foundFirstUnrun) {
      status = "En progreso...";
      foundFirstUnrun = true;
    }

    return {
      runnableId: runnable.runnableId,
      status,
      name: runnable.name,
      message: toExecute?.message ?? {},
    };
  });
};



