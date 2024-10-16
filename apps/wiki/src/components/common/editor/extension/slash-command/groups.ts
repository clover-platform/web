import { Group } from './types'
import { t } from '@easykit/common/utils/locale'

export const GROUPS: Group[] = [
    {
        name: 'ai',
        title: t("AI"),
        commands: [
            {
                name: 'aiWriter',
                label: t("内容生成"),
                iconName: 'Sparkles',
                description: t("让AI完成你的想法"),
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => editor.chain().focus()//.setAiWriter().run(),
            },
            {
                name: 'aiImage',
                label: t("图片生成"),
                iconName: 'Sparkles',
                description: t("从文本生成图像"),
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => editor.chain().focus()//.setAiImage().run(),
            },
        ],
    },
    {
        name: 'format',
        title: t("格式"),
        commands: [
            {
                name: 'heading1',
                label: t("标题一"),
                iconName: 'Heading1',
                description: t("高优先级部分标题"),
                aliases: ['h1'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 1 }).run()
                },
            },
            {
                name: 'heading2',
                label: t("标题二"),
                iconName: 'Heading2',
                description: t("中等优先级部分标题"),
                aliases: ['h2'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 2 }).run()
                },
            },
            {
                name: 'heading3',
                label: t("标题三"),
                iconName: 'Heading3',
                description: t("低优先级部分标题"),
                aliases: ['h3'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 3 }).run()
                },
            },
            {
                name: 'bulletList',
                label: t("符号列表"),
                iconName: 'List',
                description: t("无序列表"),
                aliases: ['ul'],
                action: editor => {
                    editor.chain().focus().toggleBulletList().run()
                },
            },
            {
                name: 'numberedList',
                label: t("编号列表"),
                iconName: 'ListOrdered',
                description: t("有序列表"),
                aliases: ['ol'],
                action: editor => {
                    editor.chain().focus().toggleOrderedList().run()
                },
            },
            {
                name: 'taskList',
                label: t("代办列表"),
                iconName: 'ListTodo',
                description: t("包含待办事项的任务列表"),
                aliases: ['todo'],
                action: editor => {
                    editor.chain().focus().toggleTaskList().run()
                },
            },
            {
                name: 'blockquote',
                label: t("引用"),
                iconName: 'Quote',
                description: t("引用元素"),
                action: editor => {
                    editor.chain().focus().setBlockquote().run()
                },
            },
            {
                name: 'codeBlock',
                label: t("代码块"),
                iconName: 'SquareCode',
                description: t("带语法高亮的代码块"),
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => {
                    editor.chain().focus().setCodeBlock().run()
                },
            },
        ],
    },
    {
        name: 'insert',
        title: t("插入"),
        commands: [
            {
                name: 'table',
                label: t("表格"),
                iconName: 'Table',
                description: t("插入表格"),
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
                },
            },
            {
                name: 'image',
                label: t("图片"),
                iconName: 'Image',
                description: t("插入图片"),
                aliases: ['img'],
                action: editor => {
                    editor.chain().focus().setImageUpload().run()
                },
            },
            // {
            //     name: 'columns',
            //     label: t("列"),
            //     iconName: 'Columns2',
            //     description: t("添加两列内容"),
            //     aliases: ['cols'],
            //     shouldBeHidden: editor => editor.isActive('columns'),
            //     action: editor => {
            //         editor
            //             .chain()
            //             .focus()
            //             //.setColumns()
            //             .focus(editor.state.selection.head - 1)
            //             .run()
            //     },
            // },
            {
                name: 'horizontalRule',
                label: t("水平线"),
                iconName: 'Minus',
                description: t("插入一条水平分割线"),
                aliases: ['hr'],
                action: editor => {
                    editor.chain().focus().setHorizontalRule().run()
                },
            },
            // {
            //     name: 'toc',
            //     label: t("表格内容"),
            //     iconName: 'Book',
            //     aliases: ['outline'],
            //     description: t("插入表格内容"),
            //     shouldBeHidden: editor => editor.isActive('columns'),
            //     action: editor => {
            //         editor.chain().focus()//.insertTableOfContents().run()
            //     },
            // },
        ],
    },
]

export default GROUPS
