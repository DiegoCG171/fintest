import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { clearMessages } from "../../../store/slices/messages/messages.slice";
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { resolveTargetFromRoute } from "../../../config/utils/resolveTargetFromRoute";

export const ClearMessages = () => {
  const dispathch = useAppDispatch();
  const { eventsAcquirer, eventsEmmisor } = useAppSelector((state) => state.messagesReducer);
  const events = resolveTargetFromRoute() === 'emmisor' ? eventsEmmisor : eventsAcquirer;
  const handleClearEvents = () => {
          dispathch(clearMessages(resolveTargetFromRoute()));
      }  

  return (
    <IconButton
      color="primary"
      onClick={handleClearEvents}
      sx={{ mx: 1, flexShrink: 0 }}
      disabled={events.length === 0}
    >
        <DoNotDisturbAltOutlinedIcon />
    </IconButton>
  );
};

