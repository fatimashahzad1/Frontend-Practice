import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ordersHistory } from '@/mocks/settings';
import dayjs from 'dayjs';
import React from 'react';

const BillingTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3 text-[#62618F] text-sm font-medium">
                        Date
                    </TableHead>
                    <TableHead className="w-1/3 text-[#62618F] text-sm font-medium">
                        Type
                    </TableHead>
                    <TableHead className="w-1/3 text-[#62618F] text-sm font-medium">
                        Receipt
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ordersHistory.map((order, index) => (
                    <TableRow key={`billing-order-${index}`}>
                        <TableCell className="w-1/3 max-sm:text-xs max-sm:font-normal text-base text-[#1A194D] md:font-medium">
                            {dayjs(order.createdAt).format('MMM. D, YYYY')}
                        </TableCell>
                        <TableCell className="w-1/3 max-sm:text-xs max-sm:font-normal text-base text-[#1A194D] md:font-medium">
                            {order.type}
                        </TableCell>
                        <TableCell className="w-1/3 ">
                            <Button
                                variant="outline"
                                className="max-sm:text-xs max-sm:font-normal text-base text-[#1A194D] font-medium"
                            >
                                Download
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BillingTable;
