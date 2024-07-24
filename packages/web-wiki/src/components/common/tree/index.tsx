import {useEffect, useMemo, useRef, useState} from "react";
import Sortable from "sortablejs";
import classNames from "classnames";
import {ChevronRightIcon} from "@radix-ui/react-icons";

export type TreeItemProps<T> = {
    id: string;
    title: string;
    deep?: number;
    original?: T;
    children?: TreeItemProps<T>[];
}

export type TreeProps<T> = {
    data: TreeItemProps<T>[];
    className?: string;
}

export function TreeItem<T> (props: TreeItemProps<T>) {
    const { deep = 0 } = props;
    const [open, setOpen] = useState(false);

    const hasChildren = useMemo(() => {
        return props.children && props.children.length;
    }, [props.children]);

    return <div data-id={props.id} className="list-group-item">
        <div
            className={classNames(
                "pr-2 py-1.5 rounded-md flex justify-center items-center",
                "hover:bg-[var(--action-hover)] hover:text-primary",
            )}
            style={{paddingLeft: `${deep * 20 + 8}px`}}
        >
            <span
                className={classNames(
                    "flex justify-center items-center w-4 h-4 transform-all duration-200 ease",
                    hasChildren ? "cursor-pointer" : null,
                    open ? "rotate-90" : null,
                )}
                onClick={() => hasChildren && setOpen(!open)}
            >
                { hasChildren ? <ChevronRightIcon /> : null }
            </span>
            <span className={"flex-1 mx-3"}>
                {props.title}
            </span>
        </div>
        {
            hasChildren ? <div
                data-id={props.id}
                className={classNames(
                    "list-group nested-sortable",
                    open ? "block" : "hidden",
                )}
            >
                { props.children?.map((item) => <TreeItem {...item} deep={deep + 1} key={item.id} />) }
            </div> : null
        }
    </div>
}

export function Tree <T> (props: TreeProps<T>) {
    const { data, className} = props;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Nested demo
        const nestedSortables = [].slice.call(containerRef.current?.querySelectorAll('.nested-sortable'));
        // Loop through each nested sortable element
        for (let i = 0; i < nestedSortables.length; i++) {
            new Sortable(nestedSortables[i], {
                group: 'nested',
                animation: 150,
                fallbackOnBody: true,
                swapThreshold: 0.65,
                onSort: function (evt) {
                    console.log(
                        'onSort',
                        [evt.item, evt.from, evt.to],
                        [evt.item.dataset.id, evt.from.dataset.id, evt.to.dataset.id]
                    );
                    console.log('onSort', evt.newIndex, evt.oldIndex);
                },
            });
        }
    }, [])

    return <div ref={containerRef} className={className}>
        <div className="list-group nested-sortable">
            {data.map((item) => <TreeItem {...item} deep={0} key={item.id} />)}
        </div>
    </div>
}
