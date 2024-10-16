import Tribute from "tributejs";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import classNames from "classnames";
import "./index.scss";
import { htmlEscape } from "@clover/public/components/common/editor/mentions/tools";

export type CommentEditorProps = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
};

export const MentionsEditor = forwardRef<any, CommentEditorProps>((props, ref) => {
    const {
        value,
        onChange,
    } = props;
    const [atList, setAtList] = useState([
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
    const editorRef = useRef<any>();

    const onInput = () => {
        const html = editorRef.current?.innerHTML;
        onChange?.(htmlEscape(html));
    }

    useEffect(() => {
        let tributeMultipleTriggers = new Tribute({
            allowSpaces: true,
            noMatchTemplate: function () { return ''; },
            collection: [
                {
                    trigger: "@",
                    values: atList,
                    lookup: "name",
                    fillAttr: "name",
                    selectTemplate: function(item) {
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
});
