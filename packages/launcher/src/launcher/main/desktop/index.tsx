import "./style.css";
import { FC, useEffect, useMemo, useRef } from "react";
import Sortable from 'sortablejs';
import { useConfig } from "@/state";
import { DesktopIcon } from "@/launcher/main/desktop/icon";
import { DesktopApp, DesktopGroup } from "@/interface";
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/swiper-react';
import { Mousewheel } from 'swiper/modules';

type AppContainerProps = {
    apps: DesktopApp[];
}

const AppContainer: FC<AppContainerProps> = (props) => {
    const { apps } = props;
    const appsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Sortable.create(appsRef.current, {
            animation: 200,
        });
    }, [])

    const desktopIcons = useMemo(() => {
        console.log(apps);
        return apps?.map((props) => {
            return <DesktopIcon key={props.id} {...props}/>
        })
    }, [apps]);

    return <div className={"app-icons"} ref={appsRef}>
        {desktopIcons}
    </div>;
}

export const Desktop = () => {
    const { config } = useConfig();

    const groups = useMemo(() => {
        const { apps, groups } = config;
        return groups?.map<DesktopGroup & {apps: DesktopApp[]}>((group) => {
            return {
                ...group,
                apps: apps?.filter((app) => group.id === app.group) || [],
            }
        })
    }, [config]);

    return <div className={"flex-1 apps"}>
        <Swiper
            direction={'vertical'}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
                clickable: true,
            }}
            modules={[Mousewheel]}
            className="mySwiper"
        >
            {
                groups.map((group) => {
                    return <SwiperSlide key={group.id}>
                        <AppContainer apps={group.apps} />
                    </SwiperSlide>
                })
            }
        </Swiper>
    </div>;
}
