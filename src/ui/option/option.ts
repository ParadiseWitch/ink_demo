export default class option {
  public label: string;
  public value: string;
  constructor(label: string, value?: string) {
    if (!value) this.label = this.value = label;
    this.label = label;
    this.value = value;
  }
}