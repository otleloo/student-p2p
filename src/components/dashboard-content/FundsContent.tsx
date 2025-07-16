import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import WheelOfFortuneCard from "@/components/WheelOfFortuneCard";
import { useState, useEffect, useCallback } from "react";
import { getDashboardData } from "@/app/actions/getDashboardData";
import { searchUsers } from "@/app/actions/searchUsers";
import { transferFunds } from "@/app/actions/transferFunds";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { getLeaderboard } from "@/app/actions/getLeaderboard";

export default function FundsContent() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [spinBalance, setSpinBalance] = useState(0);
  const [todaysWinnings, setTodaysWinnings] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await getDashboardData();
    const leaderboardData = await getLeaderboard();
    setCurrentBalance(data.totalFunds);
    setSpinBalance(data.spinBalance);
    setTodaysWinnings(data.todaysWinnings);
    setTotalWinnings(data.totalWinnings);
    setTotalLosses(data.totalLosses);
    setLeaderboard(leaderboardData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery).then(setSearchResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleTransfer = async () => {
    if (!selectedUser || !amount) return;
    const result = await transferFunds(selectedUser.id, parseInt(amount));
    if (result.success) {
      fetchData();
      setSearchQuery("");
      setSelectedUser(null);
      setAmount("");
      alert("Transfer successful!");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {/* Current Balance Card */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-2xl font-bold">Loading...</div>
          ) : (
            <div className="text-2xl font-bold">{currentBalance} coins</div>
          )}
          <p className="text-xs text-muted-foreground">
            Your available funds
          </p>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Spins Left</span>
              <span className="text-sm">{spinBalance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Today&apos;s Winnings</span>
              <span className="text-sm">{todaysWinnings} coins</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Winnings vs. Losses Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Winnings vs. Losses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total Winnings</span>
            <span className="text-sm text-green-500">{totalWinnings} coins</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total Losses</span>
            <span className="text-sm text-red-500">{totalLosses} coins</span>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {leaderboard.map((user, index) => (
              <li key={user.id} className="flex justify-between items-center">
                <span>{index + 1}. {user.username}</span>
                <span>{user.balance} coins</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Wheel of Fortune Card */}
      <div className="lg:col-span-2">
        <WheelOfFortuneCard spinBalance={spinBalance} refreshData={fetchData} />
      </div>

      {/* Transfer Funds Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Transfer Funds</CardTitle>
          <CardDescription>Send coins to another user.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search for a user..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedUser(null);
              }}
            />
            {searchResults.length > 0 && !selectedUser && (
              <ul className="border rounded-md">
                {searchResults.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setSearchQuery(user.username);
                    }}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            )}
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!selectedUser}
            />
            <Button onClick={handleTransfer} disabled={!selectedUser || !amount}>
              Transfer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

