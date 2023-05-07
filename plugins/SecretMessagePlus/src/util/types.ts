interface MenuOption {
  label: string;
  description?: string;
  value: string;
}

interface BaseSettingsComponent {
  type: string;
  label: string;
  description?: string;
}

interface BaseConfigSettingsComponent extends BaseSettingsComponent {
  default: any;
  key: string;
}

interface GroupSettingsComponent extends BaseSettingsComponent {
  type: "group";
  title: string;
  description?: string;
  components: SettingsComponent[];
}

interface SwitchSettingsComponent extends BaseConfigSettingsComponent {
  type: "switch";
  default: boolean;
}

interface RadioSettingsComponent extends BaseConfigSettingsComponent {
  type: "radio";
  choices: MenuOption[];
  default: string;
}

interface ChecklistSettingsComponent extends BaseConfigSettingsComponent {
  type: "checklist";
  choices: MenuOption[];
  default: string[];
}

interface InputSettingsComponent extends BaseConfigSettingsComponent {
  type: "input";
  multiline?: boolean;
  lines?: number;
  default: string;
  protected?: boolean;
}

interface ButtonSettingsComponent extends BaseConfigSettingsComponent {
  type: "button";
  onclick: () => void;
}

interface PageSettingsComponent extends BaseSettingsComponent {
  type: "page";
  components: SettingsComponent[];
}

interface TitleSettingsComponent extends BaseSettingsComponent {
  type: "title";
}

type SettingsComponent =
  | GroupSettingsComponent
  | SwitchSettingsComponent
  | RadioSettingsComponent
  | ChecklistSettingsComponent
  | InputSettingsComponent
  | ButtonSettingsComponent
  | PageSettingsComponent
  | TitleSettingsComponent;

function isJSXElement(element: any): element is JSX.Element {
  return "type" in element && "props" in element;
}

function isConfigSettingsComponent(
  component: any
): component is BaseConfigSettingsComponent {
  return "key" in component;
}

type EncryptionMethods = "legacy" | "aes" | "rsa";

export { SettingsComponent, MenuOption, isJSXElement, isConfigSettingsComponent, EncryptionMethods };
