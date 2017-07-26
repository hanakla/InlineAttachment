import {} from 'jquery'
import {default as InlineAttachment, IEditor, InlineAttachmentSettings} from "../inline-attachment";
import Utils from "../utils";

export default class jQueryInlineAttachment implements IEditor {
  public static attach(jQuery: JQueryStatic)
  {
    (jQuery.fn as any).inlineAttachment = function(options) {
      this.each(function() {
        new jQueryInlineAttachment(jQuery(this) as any, options);
      });

      return this;
    };
  }

  private inlineAttachment: InlineAttachment
  private instance: JQuery<HTMLInputElement|HTMLTextAreaElement>
  private options: Partial<InlineAttachmentSettings>

  constructor(
    instance: JQuery<HTMLInputElement|HTMLTextAreaElement>,
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
    return this.instance.val() as string;
  }

  public insertValue(val) {
    Utils.insertTextAtCursor(this.instance[0], val);
  }

  public setValue(val) {
    this.instance.val(val);
  }

  private bind() {
    const inlineAttachment = this.inlineAttachment || (this.inlineAttachment = new InlineAttachment(this, this.options));

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
