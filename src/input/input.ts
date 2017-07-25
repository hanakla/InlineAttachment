import {default as InlineAttachment, IEditor, InlineAttachmentSettings} from "../inline-attachment";
import Utils from "../utils";

export default class InputInlineAttachment implements IEditor {
  private inlineAttachment: InlineAttachment
  private instance: HTMLInputElement|HTMLTextAreaElement
  private options: Partial<InlineAttachmentSettings>

  constructor(
    instance: HTMLInputElement|HTMLTextAreaElement,
    options: Partial<InlineAttachmentSettings>
  ) {
    this.instance = instance;
    this.options = options;
    this.bind();
  }

  public getInlineAttachment()
  {
    return this.inlineAttachment;
  }

  public getValue() {
    return this.instance.value;
  }

  public insertValue(val) {
    Utils.insertTextAtCursor(this.instance, val);
  }

  public setValue(val) {
    this.instance.value = val;
  }

  private bind() {
    const inlineAttachment = this.inlineAttachment || (this.inlineAttachment = new InlineAttachment(this, this.options));

    this.instance.addEventListener('paste', function (e) {
      inlineAttachment.onPaste(e);
    }, false);
    this.instance.addEventListener('drop', function (e) {
      e.stopPropagation();
      e.preventDefault();
      inlineAttachment.onDrop(e);
    }, false);
    this.instance.addEventListener('dragenter', function (e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
    this.instance.addEventListener('dragover', function (e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
  }
}
