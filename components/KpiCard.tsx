
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Icon, IconName } from './ui/Icon';
import { formatCurrency } from '../lib/utils';

interface KpiCardProps {
  title: string;
  value: number;
  icon: IconName;
}

export default function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon name={icon} className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(value)}</div>
      </CardContent>
    </Card>
  );
}
