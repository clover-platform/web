export const getRouters = (config) => {
    const { layouts, configs, defaultComponent } = config;
    const _routers = [
        { component: defaultComponent, },
    ]
    Object.keys(layouts).forEach((key) => {
        const component = layouts[key];
        const paths = [];
        configs.forEach(({path, config}) => {
            const { name } = config;
            if(name === key) {
                paths.push([path, config])
            }
        })
        _routers.push({
            component,
            path: paths
        })
    })
    return _routers;
}
