"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BalanceComparisonChartProps {
  userBalance: number;
  highestBalance: number;
}

export default function BalanceComparisonChart({
  userBalance,
  highestBalance,
}: BalanceComparisonChartProps) {
  const generateChartData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [];
    
    // Base values for the start of the week, slightly lower than current
    const userBase = userBalance * 0.7; // Increased base fluctuation
    const highestBase = highestBalance * 0.7; // Increased base fluctuation

    for (let i = 0; i < 7; i++) {
      // Introduce more variation using sine wave or random factors
      const userFluctuation = Math.sin(i * Math.PI / 2) * (userBalance * 0.15); // Increased amplitude
      const highestFluctuation = Math.sin(i * Math.PI / 2 + Math.PI / 2) * (highestBalance * 0.15); // Increased amplitude, offset wave

      data.push({
        day: days[i],
        "Your Balance": Math.round(userBase + (userBalance - userBase) * (i / 6) + userFluctuation),
        "Highest Balance": Math.round(highestBase + (highestBalance - highestBase) * (i / 6) + highestFluctuation),
      });
    }
    return data;
  };

  const chartData = generateChartData();

  const chartConfig = {
    "Your Balance": {
      label: "Your Balance",
      color: "hsl(var(--rose-500))", // Changed to rose
    },
    "Highest Balance": {
      label: "Highest Balance",
      color: "hsl(var(--rose-300))", // Changed to a lighter rose
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Comparison</CardTitle>
        <CardDescription>
          Comparing your balance with the highest user&apos;s balance over the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillYourBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Your-Balance)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Your-Balance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillHighestBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Highest-Balance)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Highest-Balance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="Highest Balance"
              type="natural"
              fill="url(#fillHighestBalance)"
              fillOpacity={0.4}
              stroke="var(--color-Highest-Balance)"
              stackId="a"
            />
            <Area
              dataKey="Your Balance"
              type="natural"
              fill="url(#fillYourBalance)"
              fillOpacity={0.4}
              stroke="var(--color-Your-Balance)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Balance trends over the last 7 days.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}