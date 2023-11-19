import ATableTree, { Cell, Header, Headers, Row, Rows } from '@atlaskit/table-tree';
import {FC} from "react";

export interface TableTreeProps {}

type Item = {
    title: string;
    numbering: string;
    page: number;
    children?: Item[];
};

/**
 * Wrapped in a function, so that examples which manipulate data have unique instances.
 */
export const getDefaultItems = (): Item[] => [
    {
        title: 'Chapter 1: Clean Code',
        page: 1,
        numbering: '1',
    },
    {
        title: 'Chapter 2: Meaningful names',
        page: 17,
        numbering: '2',
        children: [
            {
                title: 'Section 2.1: Naming conventions',
                page: 17,
                numbering: '2.1',
            },
        ],
    },
];

let lastId = 2;
export const fetchNewItems = async (): Promise<Item[]> => {
    const id = lastId++;
    return [
        {
            title: `Section 2.${id}`,
            numbering: `2.${id}`,
            page: 17,
        },
    ];
};

export const fetchItems = async (): Promise<Item[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: 'Section 2.1: Naming conventions',
                    page: 17,
                    numbering: '2.1',
                },
            ]);
        }, 1500);
    });
};

const items = getDefaultItems();

export const TableTree:FC<TableTreeProps> = () => {
    return <ATableTree>
        <Headers>
            <Header width={200}>Chapter title</Header>
            <Header width={100}>Numbering</Header>
            <Header width={100}>Page</Header>
        </Headers>
        <Rows
            items={items}
            render={({ title, numbering, page, children = [] }: Item) => (
                <Row
                    itemId={numbering}
                    items={children}
                    hasChildren={children.length > 0}
                    isDefaultExpanded
                >
                    <Cell singleLine>{title}</Cell>
                    <Cell>{numbering}</Cell>
                    <Cell>{page}</Cell>
                </Row>
            )}
        />
    </ATableTree>;
}
