import { Group } from './types'

export const GROUPS: Group[] = [
    {
        name: 'ai',
        title: '{#AI#}',
        commands: [
            {
                name: 'aiWriter',
                label: "{#内容生成#}",
                iconName: 'Sparkles',
                description: "{#让AI完成你的想法#}",
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => editor.chain().focus()//.setAiWriter().run(),
            },
            {
                name: 'aiImage',
                label: "{#图片生成#}",
                iconName: 'Sparkles',
                description: "{#从文本生成图像#}",
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => editor.chain().focus()//.setAiImage().run(),
            },
        ],
    },
    {
        name: 'format',
        title: '{#格式#}',
        commands: [
            {
                name: 'heading1',
                label: "{#标题一#}",
                iconName: 'Heading1',
                description: "{#高优先级部分标题#}",
                aliases: ['h1'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 1 }).run()
                },
            },
            {
                name: 'heading2',
                label: "{#标题二#}",
                iconName: 'Heading2',
                description: "{#中等优先级部分标题#}",
                aliases: ['h2'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 2 }).run()
                },
            },
            {
                name: 'heading3',
                label: "{#标题三#}",
                iconName: 'Heading3',
                description: "{#低优先级部分标题#}",
                aliases: ['h3'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 3 }).run()
                },
            },
            {
                name: 'bulletList',
                label: "{#符号列表#}",
                iconName: 'List',
                description: "{#无序列表#}",
                aliases: ['ul'],
                action: editor => {
                    editor.chain().focus().toggleBulletList().run()
                },
            },
            {
                name: 'numberedList',
                label: "{#编号列表#}",
                iconName: 'ListOrdered',
                description: "{#有序列表#}",
                aliases: ['ol'],
                action: editor => {
                    editor.chain().focus().toggleOrderedList().run()
                },
            },
            {
                name: 'taskList',
                label: "{#代办列表#}",
                iconName: 'ListTodo',
                description: "{#包含待办事项的任务列表#}",
                aliases: ['todo'],
                action: editor => {
                    editor.chain().focus().toggleTaskList().run()
                },
            },
            {
                name: 'blockquote',
                label: "{#引用#}",
                iconName: 'Quote',
                description: "{#引用元素#}",
                action: editor => {
                    editor.chain().focus().setBlockquote().run()
                },
            },
            {
                name: 'codeBlock',
                label: "{#代码块#}",
                iconName: 'SquareCode',
                description: "{#带语法高亮的代码块#}",
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => {
                    editor.chain().focus().setCodeBlock().run()
                },
            },
        ],
    },
    {
        name: 'insert',
        title: '{#插入#}',
        commands: [
            {
                name: 'table',
                label: "{#表格#}",
                iconName: 'Table',
                description: "{#插入表格#}",
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
                },
            },
            {
                name: 'image',
                label: "{#图片#}",
                iconName: 'Image',
                description: "{#插入图片#}",
                aliases: ['img'],
                action: editor => {
                    editor.chain().focus()//.setImageUpload().run()
                },
            },
            // {
            //     name: 'columns',
            //     label: "{#列#}",
            //     iconName: 'Columns2',
            //     description: "{#添加两列内容#}",
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
                label: "{#水平线#}",
                iconName: 'Minus',
                description: "{#插入一条水平分割线#}",
                aliases: ['hr'],
                action: editor => {
                    editor.chain().focus().setHorizontalRule().run()
                },
            },
            // {
            //     name: 'toc',
            //     label: "{#表格内容#}",
            //     iconName: 'Book',
            //     aliases: ['outline'],
            //     description: "{#插入表格内容#}",
            //     shouldBeHidden: editor => editor.isActive('columns'),
            //     action: editor => {
            //         editor.chain().focus()//.insertTableOfContents().run()
            //     },
            // },
        ],
    },
]

export default GROUPS
