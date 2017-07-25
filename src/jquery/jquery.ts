import {} from 'jquery'
import {default as InlineAttachment, IEditor, InlineAttachmentSettings} from "../inline-attachment";
import Utils from "../utils";

export default class jQueryInlineAttachment implements IEditor {
  private instance: JQuery<HTMLInputElement|HTMLTextAreaElement>
  private options: Partial<InlineAttachmentSettings>

  constructor(
    instance: HTMLInputElement|HTMLTextAreaElement,
    options: Partial<InlineAttachmentSettings>
  ) {
    this.instance = $(instance) as JQuery<HTMLInputElement|HTMLTextAreaElement>;
    this.options = options;
    this.bind();
  }

  public getValue() {
    return this.instance.val() as string;
  }

  public insertValue(val) {
    Utils.insertTextAtCursor(this.instance[0], val);
  }

  public setValue(val) {
    this.instance.val(val);
  }

  private bind() {
    var inlineAttachment = new InlineAttachment(this, this.options);

    this.instance.bind({
      'paste': (e) => {
        inlineAttachment.onPaste(e.originalEvent);
      },
      'drop': (e) => {
        e.stopPropagation();
        e.preventDefault();
        inlineAttachment.onDrop(e.originalEvent);
      },
      'dragenter dragover': (e) => {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }
}
