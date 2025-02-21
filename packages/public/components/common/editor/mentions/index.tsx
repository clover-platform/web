import Tribute from "tributejs";
import {
  FC, Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import "./index.scss";
import {htmlEscape} from "@clover/public/components/common/editor/mentions/tools";
import {t} from '@clover/public/locale';

export type CommentEditorProps = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  ref?: Ref<{
    reset: () => void;
  }>;
};

export const MentionsEditor: FC<CommentEditorProps> = ({ref, ...props}) => {
  const {
    value,
    onChange,
  } = props;
  const [atList] = useState([
    {
      key: "1",
      value: "小明",
      position: "前端开发工程师"
    },
    {
      key: "2",
      value: "小李",
      position: "后端开发工程师"
    }
  ]);
  const editorRef = useRef<any>(undefined);

  const onInput = () => {
    const html = editorRef.current?.innerHTML;
    onChange?.(htmlEscape(html));
  }

  useEffect(() => {
    const tributeMultipleTriggers = new Tribute({
      allowSpaces: true,
      noMatchTemplate: function () {
        return '';
      },
      collection: [
        {
          trigger: "@",
          values: atList,
          lookup: "name",
          fillAttr: "name",
          selectTemplate: function (item) {
            return "@" + item.original?.value;
          },
          menuItemTemplate: function (item) {
            return item.original.value;
          },
        },
      ]
    });
    tributeMultipleTriggers.attach(editorRef.current);
    editorRef.current.innerHTML = value || "";
  }, []);

  useImperativeHandle(ref, () => {
    return {
      reset: () => {
        editorRef.current.innerHTML = "";
        onInput();
      }
    };
  }, []);

  return <div
    onInput={onInput}
    ref={editorRef}
    data-tip={t("输入 @ 以提及其他人")}
    className={classNames(
      "comment-editor",
      "outline-none p-2 min-h-20 max-h-32",
      props.className,
    )}
  />
}
