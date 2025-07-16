'use client';

import { useState } from 'react';
import WheelOfFortune from '@armin-eslami/wheel-of-fortune';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { spinWheel } from '@/app/actions/spinWheel';
import { buySpin } from '@/app/actions/buySpin';

type WheelSegment = {
  id: number;
  title: string;
  color: string;
  textColor: string;
};

const segments: WheelSegment[] = [
  { id: 1, title: "$500", color: "#C41E3A", textColor: "#FFFFFF" },
  { id: 2, title: "$100000", color: "#FFFFFF", textColor: "#000000" },
  { id: 3, title: "$200", color: "#3498db", textColor: "#FFFFFF" },
  { id: 4, title: "$0", color: "#2ecc71", textColor: "#000000" },
  { id: 5, title: "$20000", color: "#ffff00", textColor: "#03031aff" },
  { id: 6, title: "$20", color: "#9d19fbff", textColor: "#e7e7faff" },
  { id: 7, title: "$50", color: "#f88a23ff", textColor: "#03031eff" },
];

export default function WheelOfFortuneCard({ spinBalance, refreshData }: { spinBalance: number, refreshData: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [targetSegmentId, setTargetSegmentId] = useState<number | undefined>();

  const handleSpin = async () => {
    if (spinning || resetting || spinBalance <= 0) return;
    setSpinning(true);
    const result = await spinWheel();
    if (result.success) {
      setTargetSegmentId(result.segmentId);
    } else {
      console.error(result.error);
      setSpinning(false);
    }
  };

  const handleBuySpin = async () => {
    const result = await buySpin();
    if (result.success) {
      refreshData();
    } else {
      console.error(result.error);
    }
  };

  const onStop = () => {
    if (!spinning) return;
    const result = segments.find(s => s.id === targetSegmentId);
    if (result) {
      alert(`You won: ${result.title}`);
    } else {
      console.warn("No result found for ID:", targetSegmentId);
    }
    setSpinning(false);
    refreshData();
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spin to Win!</CardTitle>
        <CardDescription>You have {spinBalance} spins left.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4 space-y-4">
        <WheelOfFortune
          classNames="min-w-fit max-w-[300px]"
          segments={segments}
          spinning={spinning}
          targetSegementId={targetSegmentId}
          onStop={onStop}
          onReset={setResetting}
        />
        <div className="flex space-x-2">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSpin}
            disabled={spinning || resetting || spinBalance <= 0}
          >
            Spin the Wheel
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBuySpin}
            disabled={spinning || resetting}
          >
            Buy Spin (500 coins)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
