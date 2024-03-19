'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { Button, Space, Table, TableBody, TableRow, TableCell, Separator } from "@atom-ui/core";
import Link from "next/link";
import { i18n } from "@easy-kit/i18n/utils";
import { DetailInfoItem } from "@/components/pages/module/dashboard/detail/info-item";
import { DetailTitle } from "@/components/pages/module/dashboard/detail/title";
import { dashboard } from "@/rest/module";
import { useEffect } from "react";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
]

export const DashboardPage = () => {
    const load = async () => {
        const data = await dashboard(1);
        console.log(data);
    }

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <Link href={"/{#LANG#}/i18n/module/worktop/"}>
            <Button>{"{#工作台#}"}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={"{#概览#}"}
            actions={actions}
            border={false}
        />
        <div className={"flex justify-start items-start"}>
            <div className={"flex-1 mr-4"}>
                <Table>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className={"w-96 bg-muted p-4 rounded-md"}>
                <DetailTitle title={"{#详情#}"}>
                    {i18n("{#编号：%id#}", {id: 1})}
                </DetailTitle>
                <div className={"space-y-3"}>
                    <DetailInfoItem label="{#源语言#}">
                        简体中文
                    </DetailInfoItem>
                    <DetailInfoItem label="{#项目成员#}">
                        12
                    </DetailInfoItem>
                    <DetailInfoItem label="{#词条#}">
                        2048
                    </DetailInfoItem>
                    <DetailInfoItem label="{#创建时间#}">
                        2天前
                    </DetailInfoItem>
                    <DetailInfoItem label="{#更新时间#}">
                        2天前
                    </DetailInfoItem>
                </div>
                <Separator className={"my-4"}/>
                <DetailTitle title={"{#管理员#}"} />
            </div>
        </div>
    </>
}
