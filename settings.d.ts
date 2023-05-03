interface MenuOption {
  label: string;
  description?: string;
  value: string;
}

interface BaseSettingsComponent {
  label: string;
  description?: string;
  key: string,
  default: any,
}

interface SwitchSettingsComponent extends BaseSettingsComponent {
  type: "switch";
  default: boolean;
}

interface RadioSettingsComponent extends BaseSettingsComponent {
  type: "radio";
  choices: MenuOption[];
  default: string;
}

interface ChecklistSettingsComponent extends BaseSettingsComponent {
  type: "checklist";
  choices: MenuOption[];
  default: string[];
}

interface InputSettingsComponent extends BaseSettingsComponent {
  type: "input";
  multiline?: boolean;
  lines?: number;
  default: string;
  secure?: boolean;
}

interface ButtonSettingsComponent extends BaseSettingsComponent {
  type: "button";
  onclick: () => void;
}

interface PageSettingsComponent extends BaseSettingsComponent {
  type: "page";
  components: SettingsComponent[];
}

type SettingsComponent = SwitchSettingsComponent | RadioSettingsComponent | ChecklistSettingsComponent | InputSettingsComponent | ButtonSettingsComponent | PageSettingsComponent;