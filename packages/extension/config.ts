import type { LauncherConfig } from "@clover/launcher";

export const defaultConfig: LauncherConfig = {
    background: {
        type: "image",
        image: "/assets/image/background.jpg",
    },
    apps: [
        {
            id: 'weather',
            group: "home",
            size: '2x4',
            supportSize: ['1x1', '1x2', '2x1', '2x2', '2x4'],
            color: '#00A9FA',
            title: '天气',
            type: "widget",
            image: "/assets/image/icons/weather.png",
            triggerType: "window",
            window: {
                id: 'weather',
                title: '天气',
                type: "system",
                width: 900,
                height: 600,
                titleBar: false,
                resizable: false
            }
        },
        {
            id: 'hots',
            group: "home",
            size: '2x4',
            supportSize: ['1x1', '1x2', '2x1', '2x2', '2x4'],
            color: 'white',
            title: '热搜榜',
            type: "widget",
            image: "/assets/image/icons/hots.svg",
            triggerType: "window",
            window: {
                id: 'weather',
                title: '天气',
                type: "system",
                width: 900,
                height: 600,
                titleBar: false,
                resizable: false
            }
        },
        {
            id: 'calendar',
            group: "home",
            size: '2x2',
            supportSize: ['1x1', '1x2', '2x1', '2x2', '2x4'],
            color: '#9EC9FD',
            title: '日历',
            type: "widget",
            image: "/assets/image/icons/calendar.png",
            triggerType: "window",
            window: {
                id: 'calendar',
                title: '日历',
                type: "system",
                width: 900,
                height: 600,
                titleBar: false,
                resizable: false
            }
        },
        {
            id: 'baidu',
            group: "home",
            size: '1x1',
            supportSize: ['1x1'],
            color: '#346EFD',
            title: '百度',
            image: "/assets/image/icons/baidu.svg",
            type: "image",
            triggerType: "url",
            url: "https://www.baidu.com/"
        },
        {
            id: 'setting',
            group: "home",
            size: '1x1',
            supportSize: ['1x1'],
            color: '#2862FF',
            title: '设置',
            image: '/assets/image/system/setting.png',
            type: "image",
            triggerType: "window",
            window: {
                type: "system",
                width: 500,
                height: 600,
            }
        },
        {
            id: '10001',
            group: "home",
            size: '1x1',
            supportSize: ['1x1'],
            color: '#6ADAE9',
            title: '头像生成',
            image: '/assets/image/icons/color-avatar.png',
            type: "image",
            triggerType: "window",
            window: {
                type: "url",
                width: 900,
                height: 600,
                titleBar: false,
                url: "https://widget.codelife.cc/colorAvatar/index.html?sdk_from=inew&token=&theme=light"
            }
        },
    ]
}
