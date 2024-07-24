import {Tree} from "@/components/common/tree";

export const Catalog = () => {
    return <Tree
        className={"mx-2 my-1"}
        data={[
            {
                id: "1.1",
                title: "Item 1.1",
            },
            {
                id: "1.2",
                title: "Item 1.2",
                children: [
                    {
                        id: "2.1",
                        title: "Item 2.1",
                    },
                    {
                        id: "2.2",
                        title: "Item 2.2",
                        children: [
                            {
                                id: "3.1",
                                title: "Item 3.1",
                            },
                            {
                                id: "3.2",
                                title: "Item 3.2",
                            },
                        ]
                    },
                ]
            },
            {
                id: "1.3",
                title: "Item 1.3",
            }
        ]}
    />
}
