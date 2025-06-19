import { TabPanelProps } from "../../config/interfaces";

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tab-panel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        height: "100%",
        display: value === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export default CustomTabPanel;
