import { FC, PropsWithChildren, useState } from "react";
import {SCHEMA} from "@/config/pages/access/authority/form";
import { Button, Form, FormItem, Input, Tree, TreeItemProps } from "@clover/core";
import ApiSelector from "@/components/pages/access/authority/form/api-selector";

export interface AuthorityFormProps extends PropsWithChildren {}

const items: TreeItemProps[] = [
    {
        id: 'item1',
        content: {
            id: 'item1',
            label: 'item1'
        },
        children: [],
    },
    {
        id: 'item2',
        content: {
            id: 'item2',
            label: 'Item 2'
        },
        children: [
            {
                id: 'child2.1',
                content: {
                    id: 'child2.1',
                    label: 'child2.1'
                },
            },
            {
                id: 'child2.2',
                disabled: true,
                content: {
                    id: 'child2.2',
                    label: 'child2.2'
                },
                children: [
                    {
                        id: 'child2.2.1',
                        content: {
                            id: 'child2.2.1',
                            label: 'child2.2.1'
                        },
                    },
                ]
            },
            {
                id: 'child2.3',
                content: {
                    id: 'child2.3',
                    label: 'child2.3'
                },
            },
        ],
    },
];

const AuthorityForm: FC<AuthorityFormProps> = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const onSubmit = (data: any) => {
        console.log(data);
    }

    return <Form
        schema={SCHEMA}
        onSubmit={onSubmit}
    >
        <FormItem name="parentId" label="{#上级#}">
            <Tree
                checkbox={true}
                items={items}
            />
        </FormItem>
        <FormItem name="account" label="{#邮箱或用户名#}">
            <Input placeholder={"{#请输入邮箱或用户名#}"} />
        </FormItem>
        <FormItem name="password" label={"{#密码#}"}>
            <Input placeholder="{#请输入密码#}" type={"password"} />
        </FormItem>
        <FormItem name="apis" label={"{#关联接口#}"}>
            <ApiSelector />
        </FormItem>
        <Button loading={submitting} long type={"submit"}>{"{#立即登录#}"}</Button>
    </Form>
}

export default AuthorityForm;
