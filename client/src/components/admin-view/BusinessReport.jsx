import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  //   ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", sale: 186, invest: 80 },
  { month: "February", sale: 305, invest: 200 },
  { month: "March", sale: 237, invest: 120 },
  { month: "April", sale: 73, invest: 190 },
  { month: "May", sale: 209, invest: 130 },
  { month: "June", sale: 214, invest: 140 },
];

const chartConfig = {
  sale: {
    label: "Sale",
    color: "hsl(var(--chart-1))",
  },
  invest: {
    label: "Invest",
    color: "hsl(var(--chart-2))",
  },
};

const BusinessReport = () => {
  return (
    <div className="shadow-md bg-background w-full h-96 rounded-lg p-6 flex items-center justify-between">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Business Report</CardTitle>
          <CardDescription>Showing total sales and invest.</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
            <ChartContainer config={chartConfig} className="max-h-[180px] min-w-full">
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="invest"
                type="natural"
                fill="#35A29F"
                fillOpacity={0.4}
                stroke="#35A29F"
                stackId="a"
              />
              <Area
                dataKey="sale"
                type="natural"
                fill="#A594F9"
                fillOpacity={0.4}
                stroke="#A594F9"
                stackId="a"
              />
              <Legend
                verticalAlign="right"  // Position of the legend, can be "top", "bottom", "left", or "right"
                align="right"        // Aligns the legend, can be "center", "left", or "right"
                iconType="rect"     // Type of legend icon, can also be "line", "rect", etc.
              />
            </AreaChart>
            </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessReport;
