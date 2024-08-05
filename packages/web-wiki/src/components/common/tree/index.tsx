import {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Sortable from "sortablejs";
import classNames from "classnames";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import interact from 'interactjs';

export type TreeItemProps<T> = {
    id: string;
    title: ReactNode;
    deep?: number;
    original?: T;
    children?: TreeItemProps<T>[];
    onOpen?: (id: string, open: boolean) => void;
    open?: boolean;
}

export type TreeProps<T> = {
    data: TreeItemProps<T>[];
    className?: string;
    onChange?: (data: TreeItemProps<T>[]) => void;
}

export function TreeItem<T> (props: TreeItemProps<T>) {
    const { id, deep = 0, open, onOpen } = props;

    const hasChildren = useMemo(() => {
        return props.children && props.children.length;
    }, [props.children]);

    return <>
        <div className={"list-group-index h-1 w-full bg-black"} />
        <div data-id={id} className="list-group-item">
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
                    onClick={() => hasChildren && onOpen?.(id, !open)}
                >
                    {hasChildren ? <ChevronRightIcon/> : null}
                </span>
                <span className={"flex-1 ml-3"}>
                    {props.title}
                </span>
            </div>
            {
                hasChildren ? <div
                    data-id={props.id}
                    className={classNames(
                        "list-group",
                        open ? "block" : "hidden",
                    )}
                >
                    {props.children?.map((item) => <TreeItem {...item} onOpen={onOpen} deep={deep + 1} key={item.id}/>)}
                </div> : null
            }
        </div>
    </>
}

const sortNodes = <T, >(nodes: TreeItemProps<T>[], id: string, newIndex: number, oldIndex: number) => {
    nodes.forEach((node) => {
        if (node.id === id) {
            const [removed] = nodes.splice(oldIndex, 1);
            nodes.splice(newIndex, 0, removed);
        } else {
            if (node.children) {
                sortNodes(node.children, id, newIndex, oldIndex);
            }
        }
    });
}

const getById = <T, >(nodes: TreeItemProps<T>[], id: string): TreeItemProps<T> | undefined => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === id) {
            return node;
        } else {
            if (node.children) {
                const result = getById(node.children, id);
                if (result) {
                    return result;
                }
            }
        }
    }
    return undefined;
}

const moveAndSortNodes = <T, >(nodes: TreeItemProps<T>[], id: string, newIndex: number, oldIndex: number, from: string, to: string) => {
    const removed = getById(nodes, id);
    const fromNode = getById(nodes, from);
    const toNode = getById(nodes, to);

    const fromNodes = fromNode ? fromNode.children : nodes;
    const toNodes = toNode ? toNode.children : nodes;

    if (removed && fromNodes && toNodes) {
        fromNodes.splice(oldIndex, 1);
        toNodes.splice(newIndex, 0, removed);
    }
}

export function Tree <T> (props: TreeProps<T>) {
    const { data, className, onChange} = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const sortables = useRef<Sortable[]>([]);
    const [nodes, setNodes] = useState<TreeItemProps<T>[]>(data);
    const cacheMap = useRef<Record<string, any>>({});
    const [treeKey, setTreeKey] = useState(Date.now());
    const [opened, setOpened] = useState<string[]>([]);

    useEffect(() => {
        setNodes(data);
        cacheMap.current = {};
    }, [data]);

    useEffect(() => {
        interact('.list-group-index, .list-group-item').dropzone({
            // only accept elements matching this CSS selector
            accept: '.list-group-item',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active')
            },
            ondragenter: function (event) {
                var draggableElement = event.relatedTarget
                var dropzoneElement = event.target

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target')
                draggableElement.classList.add('can-drop')
                draggableElement.textContent = 'Dragged in'
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target')
                event.relatedTarget.classList.remove('can-drop')
                event.relatedTarget.textContent = 'Dragged out'
            },
            ondrop: function (event) {
                event.relatedTarget.textContent = 'Dropped'
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active')
                event.target.classList.remove('drop-target')
            }
        });
        interact('.list-group-item').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            onmove: function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform =
                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onend: function(event) {
                console.log(event);
            }
        }).on('move', function (event) {
            var interaction = event.interaction;
            if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
                var original = event.currentTarget;
                var clone = event.currentTarget.cloneNode(true);
                var x = clone.offsetLeft;
                var y = clone.offsetTop;
                clone.setAttribute('clonable','false');
                clone.style.position = "absolute";
                clone.style.left = original.offsetLeft+"px";
                clone.style.top = original.offsetTop+"px";
                clone.style.zIndex = 99999;
                document.body.appendChild(clone);
                interaction.start({ name: 'drag' },event.interactable,clone);
            }
        });
        /*
        // Nested demo
        const nestedSortables = [].slice.call(containerRef.current?.querySelectorAll('.nested-sortable'));
        // Loop through each nested sortable element
        for (let i = 0; i < nestedSortables.length; i++) {
            const instance = new Sortable(nestedSortables[i], {
                group: 'nested',
                animation: 150,
                fallbackOnBody: true,
                swapThreshold: 0.65,
                onSort: function (evt) {
                    const id = evt.item.dataset.id;
                    const key = `${evt.from.dataset.id}-${evt.to.dataset.id}-${id}-${evt.newIndex}-${evt.oldIndex}`;
                    if(cacheMap.current[key]) {
                        return;
                    }
                    cacheMap.current[key] = true;

                    console.log(
                        'onSort',
                        [evt.item, evt.from, evt.to],
                        [id, evt.from.dataset.id, evt.to.dataset.id],
                        [evt.newIndex, evt.oldIndex],
                    );
                    if(evt.from.dataset.id === evt.to.dataset.id) {
                        sortNodes(nodes, id!, evt.newIndex!, evt.oldIndex!);
                    }else{
                        moveAndSortNodes(nodes, id!, evt.newIndex!, evt.oldIndex!, evt.from.dataset.id!, evt.to.dataset.id!);
                    }
                    const newNodes = [...nodes];
                    console.log('newNodes', newNodes);
                    setTreeKey(Date.now());
                    setNodes(newNodes);
                    onChange?.(newNodes);
                },
            });
            sortables.current.push(instance);
        }
         */
        return () => {
            interact('.list-group-item, .list-group-index').unset();
            /*
            sortables.current.forEach((sortable) => {
                sortable.destroy();
            });
            sortables.current = [];
             */
        }
    }, [nodes])

    const nodesWithState = useMemo(() => {
        const loop = (nodes: TreeItemProps<T>[]): TreeItemProps<T>[] => {
            return nodes.map((item) => {
                return {
                    ...item,
                    open: opened.includes(item.id),
                    children: item.children ? loop(item.children) : undefined,
                }
            });
        }
        return loop(nodes);
    }, [nodes, opened]);

    const onOpen = useCallback((id: string, open: boolean) => {
        if(open) {
            !opened.includes(id) && setOpened([...opened, id]);
        }else {
            setOpened(opened.filter(item => item !== id));
        }
    },[opened])

    return <div ref={containerRef} className={className}>
        <div className="list-group" key={treeKey}>
            {nodesWithState.map((item) => <TreeItem {...item} onOpen={onOpen} deep={0} key={item.id} />)}
        </div>
    </div>
}
