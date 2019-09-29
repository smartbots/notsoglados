export class ProcessingRule {
  constructor() {
    this.regex = null;
    this.channel = null;
    this.canBeProcessed = null;
    this.handler = () => {};
  }
}
